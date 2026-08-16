const form = document.querySelector('#taskForm');
const input = document.querySelector('#taskInput');
const list = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');
const themeToggle = document.querySelector('#themeToggle');

let tasks = JSON.parse(localStorage.getItem('noghte-tasks') || '[]');

function saveTasks() { localStorage.setItem('noghte-tasks', JSON.stringify(tasks)); }

function renderTasks() {
  list.innerHTML = '';
  emptyState.hidden = tasks.length > 0;
  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''} aria-label="انجام شد" /><span class="${task.done ? 'complete' : ''}"></span><button class="delete" aria-label="حذف کار">×</button>`;
    item.querySelector('span').textContent = task.title;
    item.querySelector('input').addEventListener('change', () => { task.done = !task.done; saveTasks(); renderTasks(); });
    item.querySelector('.delete').addEventListener('click', () => { tasks = tasks.filter((entry) => entry.id !== task.id); saveTasks(); renderTasks(); });
    list.append(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks.unshift({ id: Date.now(), title, done: false });
  saveTasks(); input.value = ''; renderTasks();
});

const savedTheme = localStorage.getItem('noghte-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('noghte-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

renderTasks();
