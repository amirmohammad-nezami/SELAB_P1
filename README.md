# گزارش آزمایش اول | نقطه

**دانشجو:** امیرمحمد نظامی<br>
**شمارهٔ دانشجویی:** ۴۰۱۱۰۶۶۳۹<br>
**نوع پروژه:** انفرادی (تیم یک‌نفره)

برای این آزمایش یک فرانت‌اند ایستا و فارسی با نام «نقطه» پیاده‌سازی کردم. ایدهٔ سایت، یک برنامه‌ریز خیلی سبک برای کارهای روزانه است. پروژه را با HTML، CSS و JavaScript خالص نوشته‌ام تا بدون مرحلهٔ build و بدون نیاز به سرور اجرا شود.

> آدرس GitHub Pages: `https://amirmohammad-nezami.github.io/SELAB_P1/`

## اجرای پروژه روی سیستم

فایل `index.html` را با مرورگر باز کنید. برای اجرای محلی با یک وب‌سرور سبک نیز می‌توان از دستور زیر استفاده کرد:

```bash
python3 -m http.server 8000
```

سپس به `http://localhost:8000` بروید.

## امکاناتی که پیاده‌سازی کردم

- طراحی واکنش‌گرا و راست‌به‌چپ
- فهرست کارهای روزانه با ذخیره‌سازی در `localStorage`
- امکان تکمیل و حذف کارها
- حالت تیره با حفظ انتخاب کاربر
- استقرار خودکار روی GitHub Pages در هر push به `main`

## ساختار پروژه

```text
.
├── .github/workflows/deploy-pages.yml  # استقرار خودکار
├── assets/
│   ├── css/style.css                   # ظاهر و واکنش‌گرایی
│   └── js/app.js                       # تعامل‌های صفحه
├── .gitignore
├── .nojekyll
└── index.html
```

## استقرار خودکار با GitHub Pages

فایل workflow در `.github/workflows/deploy-pages.yml` قرار دارد. هر بار که به شاخهٔ `main` push شود، این مراحل انجام می‌شوند:

1. کد مخزن را دریافت می‌کند.
2. تنظیمات GitHub Pages را آماده می‌کند.
3. کل فایل‌های ایستا را به‌عنوان artifact بارگذاری می‌کند.
4. artifact را با action رسمی GitHub روی Pages منتشر می‌کند.

برای فعال‌شدن نخستین استقرار، از مسیر **Settings → Pages** و بخش **Build and deployment**، مقدار **Source** را روی **GitHub Actions** می‌گذارم. پس از پایان workflow، آدرس نهایی در summary اجرا و بخش Pages نمایش داده می‌شود.

## گزارش فرآیند Git

### شاخه‌ها

با اینکه پروژه انفرادی است، برای تمرین درست Git و جدا نگه‌داشتن تغییرها از چند شاخه استفاده کردم. شاخه‌های زیر در مخزن وجود دارند:

| شاخه | کاربرد | مقصد ادغام |
| --- | --- | --- |
| `main` | نسخهٔ پایدار و قابل استقرار | — |
| `develop` | یکپارچه‌سازی تغییرات روزمره | `main` با PR |
| `feature/task-planner` | پیاده‌سازی فهرست کارها و localStorage | `develop` با PR |
| `feature/hero-copy` و `feature/hero-message` | تغییر متن بخش معرفی | `main` |
| `feature/accent-color` و `feature/accent-contrast` | اصلاح رنگ تأکیدی سایت | `main` |

نمونهٔ دستورات ایجاد و انتشار شاخه:

```bash
git switch -c develop
git push -u origin develop
git switch -c feature/task-planner
git push -u origin feature/task-planner
```

### سیاست Pull Request و محافظت از main

چون مخزن من انفرادی است، تأیید شخص دیگری لازم ندارم؛ ولی برای رعایت شرط آزمایش، از مسیر **Settings → Branches → Add branch protection rule** یک قانون برای `main` می‌سازم و گزینهٔ زیر را فعال می‌کنم:

- **Require a pull request before merging**

از این به بعد هر تغییر را در شاخهٔ feature انجام می‌دهم، برای آن Pull Request باز می‌کنم و بعد از بررسی خودم آن را merge می‌کنم. در نتیجه push مستقیم به `main` انجام نمی‌دهم.

### conflictهای ثبت و رفع‌شده

برای آشنایی با conflict، عمداً دو تغییر ناسازگار روی یک فایل در دو شاخه انجام دادم و بعد آن‌ها را حل کردم:

| conflict | شاخه‌های درگیر | فایل | commit حل |
| --- | --- | --- | --- |
| متن معرفی | `feature/hero-copy` و `feature/hero-message` | `index.html` | `fix: resolve hero copy merge conflict` |
| رنگ تأکیدی | `feature/accent-color` و `feature/accent-contrast` | `assets/css/style.css` | `fix: resolve accent color merge conflict` |

در هر مورد ابتدا یکی از شاخه‌ها را merge کردم. موقع merge شاخهٔ دوم conflict ایجاد شد و بعد از انتخاب نتیجهٔ مناسب، آن را با یک commit مستقل ثبت کردم. روند کلی به شکل زیر بود:

```bash
# conflict اول: تغییر ناسازگار در متن معرفی
git switch main
git merge feature/hero-message
# فایل دارای conflict را دستی اصلاح کنید، سپس:
git add index.html
git commit -m "resolve conflict between landing heading and develop copy"

# conflict دوم: تغییر ناسازگار در رنگ تأکیدی
git switch main
git merge feature/accent-contrast
# فایل را اصلاح کنید، سپس:
git add assets/css/style.css
git commit -m "resolve mobile layout conflict with main styles"
```

هنگام conflict، نشانه‌های `<<<<<<<`، `=======` و `>>>>>>>` باید حذف شوند. نتیجهٔ حل‌شده را در مرورگر آزمایش و سپس commit کنید. این دو commit باید در تاریخچهٔ واقعی مخزن باقی بمانند.

### commitهای معنادار

تا زمان تکمیل این گزارش، تاریخچهٔ پروژه بیش از ۲۹ commit دارد. سعی کردم هر commit فقط یک تغییر مشخص داشته باشد؛ مثلاً تغییر ظاهر، اضافه‌کردن قابلیت، مستندات یا حل conflict را در یک commit جدا ثبت کردم. چند نمونه از commitهای مهم:

| # | نام commit | تغییر مستقل |
| --- | --- | --- |
| 1 | `chore: add gitignore rules` | افزودن قواعد نادیده‌گرفتن فایل‌ها |
| 2 | `feat: add semantic landing page` | اسکلت HTML و محتوای صفحه |
| 3 | `feat: add keyboard skip navigation` | دسترس‌پذیری با صفحه‌کلید |
| 4 | `style: add responsive application design` | طراحی واکنش‌گرا |
| 5 | `feat: add local task planner interactions` | افزودن، تکمیل و حذف کارها |
| 6 | `ci: add GitHub Pages deployment workflow` | workflow استقرار |
| 7 | `feat: add branded browser icon` | favicon و manifest |
| 8 | `docs: add pull request checklist` | چک‌لیست Pull Request |
| 9 | `ci: configure action dependency updates` | به‌روزرسانی actionها |
| 10 | `fix: resolve hero copy merge conflict` | حل conflict اول |
| 11 | `fix: resolve accent color merge conflict` | حل conflict دوم |

پس از هر تغییر، وضعیت را بررسی و تغییر مرتبط را جداگانه ثبت کنید:

```bash
git status
git add <file>
git commit -m "type: concise meaningful change"
git log --oneline --graph --all
```

## پاسخ پرسش‌ها

### ۱. پوشهٔ `.git` چیست و چه چیزهایی در آن نگهداری می‌شود؟

`.git` پوشهٔ داخلی پایگاه دادهٔ Git در ریشهٔ repository محلی است. Git در آن objectهای محتوا (blob)، درخت‌ها (tree)، commitها، شاخه‌ها و tagها (refs)، فایل `HEAD`، تنظیمات (`config`)، index و اطلاعات remoteها را نگه می‌دارد. این پوشه با دستور `git init` ساخته می‌شود؛ هنگام `git clone` نیز ساخته و مقداردهی می‌شود. حذف آن یعنی پوشهٔ پروژه دیگر تاریخچه و تنظیمات Git خود را ندارد.

### ۲. atomic commit و atomic pull request چه هستند؟

**Atomic commit** فقط یک تغییر منطقی و کامل را ثبت می‌کند؛ مثلاً افزودن localStorage، نه هم‌زمان افزودن localStorage و تغییر رنگ کل سایت. چنین commitی راحت‌تر مرور، revert و cherry-pick می‌شود. **Atomic pull request** نیز یک هدف مشخص و قابل بررسی دارد و مجموعه‌ای از commitهای مرتبط را، بدون تغییرات نامرتبط، برای ادغام ارائه می‌کند.

### ۳. تفاوت `fetch`، `pull`، `merge`، `rebase` و `cherry-pick`

| دستور | کار اصلی | اثر روی شاخهٔ فعلی |
| --- | --- | --- |
| `git fetch` | commitها و referenceهای remote را دانلود می‌کند | فایل کاری و تاریخچهٔ شاخهٔ محلی را ادغام نمی‌کند |
| `git pull` | معمولاً `fetch` و سپس `merge` (یا با گزینه، rebase) است | شاخهٔ فعلی را با remote به‌روز می‌کند |
| `git merge` | تاریخچهٔ یک شاخه را به شاخهٔ فعلی وصل می‌کند | ممکن است merge commit بسازد و conflict داشته باشد |
| `git rebase` | commitهای شاخهٔ فعلی را روی پایهٔ جدید بازنویسی می‌کند | تاریخچه را خطی‌تر اما شناسهٔ commitها را عوض می‌کند |
| `git cherry-pick <commit>` | فقط یک commit مشخص را روی شاخهٔ فعلی اعمال می‌کند | یک commit جدید معادل آن می‌سازد |

قاعدهٔ مهم: اگر بعدها مخزن چندنفره شد، نباید روی تاریخچه‌ای که دیگران از آن استفاده می‌کنند بدون هماهنگی rebase انجام دهم.

### ۴. تفاوت `reset`، `revert`، `restore`، `switch` و `checkout`

| دستور | کاربرد |
| --- | --- |
| `git reset` | جابه‌جایی `HEAD` و در حالت‌های مختلف تغییر index یا working tree؛ برای بازنویسی تاریخچهٔ محلی مناسب است. |
| `git revert` | یک commit تازه می‌سازد که اثر commit قبلی را خنثی می‌کند؛ برای تاریخچهٔ منتشرشده امن‌تر است. |
| `git restore` | بازگرداندن محتوای فایل در working tree یا stage از یک منبع مشخص است. |
| `git switch` | جابه‌جایی یا ساخت شاخه، با رابط روشن‌تر و جدیدتر. |
| `git checkout` | دستور قدیمی‌تر و چندمنظوره برای جابه‌جایی شاخه یا بازگرداندن فایل؛ به‌دلیل ابهام، `switch` و `restore` ترجیح داده می‌شوند. |

### ۵. stage/index چیست و `stash` چه می‌کند؟

**Stage** یا **index** ناحیهٔ میانی بین working directory و commit است. با `git add` نسخهٔ دقیق فایل‌ها را وارد index می‌کنیم تا commit بعدی فقط همان بخش‌های انتخاب‌شده را ثبت کند. `git stash` تغییرات ثبت‌نشده (و در صورت درخواست فایل‌های untracked) را موقتاً کنار می‌گذارد و working tree را تمیز می‌کند؛ سپس با `git stash pop` یا `git stash apply` می‌توان آن‌ها را برگرداند.

### ۶. snapshot چیست و چه ارتباطی با commit دارد؟

Git به‌جای ذخیرهٔ صرفِ تفاوت فایل‌ها، وضعیت پروژه را در هر لحظه به‌صورت یک **snapshot** از فایل‌های tracked مدل می‌کند. هر commit به یک tree (ساختار پوشه‌ها) و blobهای محتوای فایل‌ها اشاره می‌کند، همراه با parent، نویسنده، زمان و پیام. اگر فایلی تغییر نکرده باشد، Git همان شیء قبلی را دوباره استفاده می‌کند؛ بنابراین هر commit یک snapshot نام‌دار و قابل بازگشت از پروژه است.

### ۷. تفاوت local repository و remote repository

**Local repository** نسخهٔ Git روی رایانهٔ من است؛ تاریخچه، شاخه‌ها و commitها حتی بدون اینترنت هم وجود دارند. **Remote repository** نسخهٔ مخزن روی سرویسی مانند GitHub است. من با `push` تغییرات محلی را به آن فرستادم و از آن برای نگه‌داری نسخهٔ عمومی پروژه، Pull Request، محافظت از شاخه و اجرای GitHub Actions استفاده می‌کنم. remote جایگزین repository محلی نیست، بلکه نسخهٔ آنلاین و اشتراکی آن است.

## چک‌لیست تحویل

- [x] remote مخزن GitHub تنظیم و همهٔ شاخه‌های لازم push شده‌اند.
- [x] حداقل ۲۰ commit معنادار در `git log --oneline --all` دیده می‌شود.
- [x] حداقل سه شاخهٔ معنادار به remote ارسال شده‌اند.
- [x] دو conflict واقعی حل و commit شده‌اند.
- [ ] برای تغییرهای بعدی، ادغام‌ها از طریق Pull Request انجام می‌شوند.
- [ ] قانون محافظت از `main` فعال است.
- [ ] GitHub Pages با Source = GitHub Actions فعال و آدرس نهایی بالای README جایگزین شده است.
- [ ] ویدئوی مراحل طبق ضوابط درس ضبط شده است.
