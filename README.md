# نقطه | تمرکز امروز

یک فرانت‌اند ایستا و فارسی برای مدیریت سادهٔ کارهای روزانه. پروژه با HTML، CSS و JavaScript خالص ساخته شده و بدون نیاز به build یا سرور اجرا می‌شود.

> آدرس GitHub Pages: `https://amirmohammad-nezami.github.io/SELAB_P1/`

## اجرای محلی

فایل `index.html` را با مرورگر باز کنید. برای اجرای محلی با یک وب‌سرور سبک نیز می‌توان از دستور زیر استفاده کرد:

```bash
python3 -m http.server 8000
```

سپس به `http://localhost:8000` بروید.

## قابلیت‌ها

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

فایل workflow در `.github/workflows/deploy-pages.yml` قرار دارد و با هر push به شاخهٔ `main` این مراحل را اجرا می‌کند:

1. کد مخزن را دریافت می‌کند.
2. تنظیمات GitHub Pages را آماده می‌کند.
3. کل فایل‌های ایستا را به‌عنوان artifact بارگذاری می‌کند.
4. artifact را با action رسمی GitHub روی Pages منتشر می‌کند.

برای فعال‌سازی نخستین استقرار در GitHub، در مخزن به **Settings → Pages** بروید و در بخش **Build and deployment**، مقدار **Source** را روی **GitHub Actions** قرار دهید. پس از اتمام workflow، آدرس نهایی در summary همان اجرا و در بخش Pages نمایش داده می‌شود.

## گزارش فرآیند Git

### شاخه‌ها

فرآیند پیشنهادی توسعه بر مبنای Pull Request است و دست‌کم این شاخه‌های معنادار را دارد:

| شاخه | کاربرد | مقصد ادغام |
| --- | --- | --- |
| `main` | نسخهٔ پایدار و قابل استقرار | — |
| `develop` | یکپارچه‌سازی تغییرات روزمره | `main` با PR |
| `feature/landing-page` | ساخت ساختار و طراحی صفحهٔ اصلی | `develop` با PR |
| `feature/task-planner` | پیاده‌سازی فهرست کارها و localStorage | `develop` با PR |
| `feature/github-pages` | افزودن workflow استقرار خودکار | `main` با PR |
| `hotfix/mobile-layout` | رفع اشکال نمایش موبایل | `main` با PR |

نمونهٔ دستورات ایجاد و انتشار شاخه:

```bash
git switch -c develop
git push -u origin develop
git switch -c feature/task-planner
git push -u origin feature/task-planner
```

### سیاست Pull Request و محافظت از main

برای این مخزن انفرادی، از مسیر **Settings → Branches → Add branch protection rule** یک قانون برای `main` بسازید و گزینه‌های زیر را فعال کنید:

- **Require a pull request before merging**

برای کار انفرادی نیازی به approval شخص دیگر نیست؛ در عوض هر تغییر را از شاخهٔ feature با Pull Request خودتان بررسی و merge کنید. پس از فعال‌سازی قانون، push مستقیم به `main` انجام ندهید.

### conflictهای ثبت و رفع‌شده

دو conflict محتوایی در تاریخچهٔ محلی این تحویل ایجاد و حل شده‌اند:

| conflict | شاخه‌های درگیر | فایل | commit حل |
| --- | --- | --- | --- |
| متن معرفی | `feature/hero-copy` و `feature/hero-message` | `index.html` | `fix: resolve hero copy merge conflict` |
| رنگ تأکیدی | `feature/accent-color` و `feature/accent-contrast` | `assets/css/style.css` | `fix: resolve accent color merge conflict` |

در هر مورد ابتدا یکی از شاخه‌ها merge شد، merge شاخهٔ دوم conflict ساخت و پس از انتخاب نتیجهٔ نهایی، conflict با commit مستقل ثبت شد. نمونهٔ روند کلی:

برای ثبت شفاف conflictها، هر عضو باید تغییرات مستقل خود را در شاخهٔ جداگانه commit و push کند. نمونهٔ قابل تکرار:

```bash
# conflict اول: دو تغییر ناسازگار در تیتر صفحه
git switch feature/landing-page
git merge develop
# فایل دارای conflict را دستی اصلاح کنید، سپس:
git add index.html
git commit -m "resolve conflict between landing heading and develop copy"

# conflict دوم: دو تغییر ناسازگار در style.css
git switch hotfix/mobile-layout
git merge main
# فایل را اصلاح کنید، سپس:
git add assets/css/style.css
git commit -m "resolve mobile layout conflict with main styles"
```

هنگام conflict، نشانه‌های `<<<<<<<`، `=======` و `>>>>>>>` باید حذف شوند. نتیجهٔ حل‌شده را در مرورگر آزمایش و سپس commit کنید. این دو commit باید در تاریخچهٔ واقعی مخزن باقی بمانند.

### برنامهٔ حداقل ۲۰ commit معنادار

هر سطر زیر یک تغییر کوچک، مستقل و قابل بازبینی است؛ پیام‌ها را می‌توان دقیقاً با همین مفهوم استفاده کرد. از commitهای صوری یا چند تغییر نامرتبط در یک commit خودداری کنید.

| # | پیام پیشنهادی commit | تغییر مستقل |
| --- | --- | --- |
| 1 | `chore: initialize static frontend repository` | ایجاد مخزن و فایل آغازین |
| 2 | `chore: add gitignore rules` | افزودن قواعد نادیده‌گرفتن فایل‌ها |
| 3 | `feat: add semantic page skeleton` | اسکلت HTML |
| 4 | `feat: add site header and navigation` | سربرگ |
| 5 | `feat: add hero section content` | بخش معرفی |
| 6 | `style: add base typography and color tokens` | متغیرها و تایپوگرافی |
| 7 | `style: add hero card layout` | کارت برنامهٔ نمونه |
| 8 | `feat: add product feature cards` | ویژگی‌ها |
| 9 | `style: add responsive mobile layout` | نمایش موبایل |
| 10 | `feat: add task planner markup` | رابط برنامه‌ریز |
| 11 | `feat: add task creation interaction` | افزودن کار |
| 12 | `feat: persist tasks in local storage` | ماندگاری داده |
| 13 | `feat: add task completion and deletion` | تکمیل و حذف |
| 14 | `feat: add dark theme toggle` | حالت تیره |
| 15 | `style: refine focus and accessible controls` | دسترس‌پذیری کنترل‌ها |
| 16 | `docs: document local development` | راهنمای اجرا |
| 17 | `ci: add GitHub Pages deployment workflow` | workflow استقرار |
| 18 | `ci: configure Pages artifact deployment` | artifact و permissionها |
| 19 | `fix: resolve landing page merge conflict` | حل conflict اول |
| 20 | `fix: resolve mobile styles merge conflict` | حل conflict دوم |
| 21 | `docs: add Git workflow and deployment report` | گزارش نهایی |

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

قاعدهٔ مهم: روی تاریخچه‌ای که دیگران از آن استفاده می‌کنند rebase نکنید، مگر با هماهنگی تیم.

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

**Local repository** نسخهٔ Git روی رایانهٔ توسعه‌دهنده است؛ تاریخچه، شاخه‌ها و commitهای شخص می‌توانند حتی بدون اینترنت وجود داشته باشند. **Remote repository** نسخه‌ای اشتراکی روی سرویسی مانند GitHub است که اعضای تیم با `push` تغییرات محلی را به آن می‌فرستند و با `fetch` یا `pull` تغییرات دیگران را می‌گیرند. remote محل همکاری، Pull Request، محافظت از شاخه و اجرای GitHub Actions است، نه جایگزین repository محلی.

## چک‌لیست تحویل

- [ ] remote مخزن GitHub تنظیم و همهٔ شاخه‌های لازم push شده‌اند.
- [ ] حداقل ۲۰ commit معنادار در `git log --oneline --all` دیده می‌شود.
- [ ] حداقل سه شاخهٔ معنادار به remote ارسال شده‌اند.
- [ ] دو conflict واقعی حل و commit شده‌اند.
- [ ] ادغام‌ها از طریق Pull Request انجام شده‌اند.
- [ ] قانون محافظت از `main` فعال است.
- [ ] GitHub Pages با Source = GitHub Actions فعال و آدرس نهایی بالای README جایگزین شده است.
- [ ] ویدئوی مراحل طبق ضوابط درس ضبط شده است.
