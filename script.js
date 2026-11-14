const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterTasks = document.getElementById('filterTasks');

// ЗАВДАННЯ 1: Динамічний інтерактивний список задач
function addTask(text) {
    if (!text.trim()) return;

    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        applyFilter();
    });

    const span = document.createElement('span');
    span.textContent = text; 

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.append(checkbox, span, deleteBtn);
    taskList.append(li);
}

function applyFilter() {
    const filterValue = filterTasks.value;
    const tasks = taskList.querySelectorAll('.task-item');
    
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (filterValue === 'all') {
            task.style.display = 'flex';
        } else if (filterValue === 'active' && !isCompleted) {
            task.style.display = 'flex';
        } else if (filterValue === 'completed' && isCompleted) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
    taskInput.value = '';
});
filterTasks.addEventListener('change', applyFilter);

addTask('Вивчити DOM');
addTask('Зрозуміти Event Delegation');


// ЗАВДАННЯ 2: Оптимізація рендерингу (DocumentFragment)
const tbody = document.querySelector('#perfTable tbody');
const perfResults = document.getElementById('perfResults');

document.getElementById('testDirect').addEventListener('click', () => {
    tbody.innerHTML = ''; 
    const start = performance.now();
    
    for (let i = 0; i < 2000; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = i + 1;
        td2.textContent = `Пряма вставка ${i}`;
        tr.append(td1, td2);
        tbody.append(tr); 
    }
    
    const end = performance.now();
    perfResults.textContent = `Час виконання (Пряма вставка): ${(end - start).toFixed(2)} мс`;
});

document.getElementById('testFragment').addEventListener('click', () => {
    tbody.innerHTML = '';
    const start = performance.now();
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 2000; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = i + 1;
        td2.textContent = `DocumentFragment ${i}`;
        tr.append(td1, td2);
        fragment.append(tr);
    }
    tbody.append(fragment); 
    
    const end = performance.now();
    perfResults.textContent = `Час виконання (DocumentFragment): ${(end - start).toFixed(2)} мс`;
});

document.getElementById('clearTable').addEventListener('click', () => tbody.innerHTML = '');


// ЗАВДАННЯ 3: Клієнтська навігація (BOM History API)
const routes = {
    'home': '<h2>Головна сторінка</h2><p>Головна сторінка SPA додатку.</p>',
    'profile': '<h2>Профіль користувача</h2><p>Тут відображаються дані вашого профілю.</p>',
    'settings': '<h2>Налаштування</h2><p>Керування конфігурацією системи.</p>'
};
const routerView = document.getElementById('router-view');

function renderRoute(route) {
    routerView.innerHTML = routes[route] || routes['home'];
}

document.getElementById('spa-nav').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault(); 
        const route = event.target.getAttribute('data-route');
        const url = `?tab=${route}`;
        
        window.history.pushState({ route }, '', url);
        renderRoute(route);
    }
});

window.addEventListener('popstate', (event) => {
    const route = event.state ? event.state.route : 'home';
    renderRoute(route);
});

const urlParams = new URLSearchParams(window.location.search);
const initialRoute = urlParams.get('tab') || 'home';
renderRoute(initialRoute);


// ЗАВДАННЯ 4: Делегування подій (Event Delegation)
const gridContainer = document.getElementById('gridContainer');

for (let i = 1; i <= 6; i++) {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.textContent = `Факт №${i}`;
    gridContainer.append(div);
}

gridContainer.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.grid-item');
    
    if (clickedItem) {
        clickedItem.classList.toggle('active');
        
        if (clickedItem.classList.contains('active')) {
            clickedItem.textContent = `Факт відкрито!`;
        } else {
            clickedItem.textContent = `Факт закрито`;
        }
    }
});