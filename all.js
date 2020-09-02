let todoInput = document.getElementById('newTodo');
let addBtn = document.getElementById('addTodo');
let clearAllBtn = document.getElementById('clearTask');
let todoList = document.getElementById('todoList');
let countTodo = document.getElementById('taskCount');

addBtn.addEventListener('click', addTodo);
clearAllBtn.addEventListener('click', clearAllTask);
todoList.addEventListener('click', doSomething);

let todoData = []
//一進頁面就要立刻顯示清單
renderPage(todoData);

function addTodo() {
    //取出輸入值，並去除前後空白
    let newTodo = todoInput.value.trim();
    let timeStamp = Date.now();
    if (newTodo !== '') {
        todoData.push({
            id: timeStamp,
            title: newTodo,
            completed: false,
        })
        renderPage(todoData);
        todoInput.value = '';
    }
}

function removeTodo(id) {
    let newIndex = 0;
    todoData.forEach((item, key) => {
        if (id == item.id) {
            newIndex = key;
        }
    })
    todoData.splice(newIndex, 1);
    renderPage(todoData);
}

function completeTodo(id) {
    todoData.forEach((item) => {
        if (id == item.id) {
            item.completed = item.completed ? false : true;
        }
    })
    renderPage(todoData);
}

function clearAllTask(e) {
    e.preventDefault();
    todoData = [];
    renderPage(todoData);
}

function doSomething(e) {
    let action = e.target.parentNode.dataset.action;
    let id = e.target.parentNode.dataset.id;
    if (action == 'remove') {
        removeTodo(id)
    } else if (action === 'complete') {
        completeTodo(id)
    }
}

function renderPage(data) {
    let str = '';
    data.forEach((item) => {
        str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check" data-action="complete" data-id="${item.id}">
<input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''}>
<label class="form-check-label ${item.completed ? 'completed' : ''}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto remove" aria-label="Close" data-action="remove" data-id="${item.id}">
<span aria-hidden="true">&times;</span>
</button>
</div>
</li>`;
    })
    todoList.innerHTML = str;
    countTodo.textContent = data.length;
}