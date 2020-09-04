let todoInput = document.getElementById('newTodo');
let addBtn = document.getElementById('addTodo');
let clearAllBtn = document.getElementById('clearTask');
let todoList = document.getElementById('todoList');
let countTodo = document.getElementById('taskCount');

//由於所有函式都會使用到這個array做資料蒐集，所以在全域做宣告
let todoData = [];
//一開啟網頁立刻執行頁面渲染
render(todoData);
//綁定新增任務的事件
addBtn.addEventListener('click', addTodo);
//綁定清除所有列表的事件
clearAllBtn.addEventListener('click', clearAllTask);
//綁訂單一刪除或勾選的事件
todoList.addEventListener('click', doSomething);

function addTodo() {
    //取出輸入值，並清除前後空白
    let newTodo = todoInput.value.trim();
    //取得時間戳記，作為每筆資料的id值
    let timeStamp = Date.now();
    if (newTodo != '') {
        //收集資料
        todoData.push({
            id: timeStamp,
            title: newTodo,
            completed: false,
        });
    };
    //清除input項目
    todoInput.value = '';
    //渲染畫面
    render(todoData);
};
function clearAllTask() {
    //停止預設的連結功能
    e.preventDefault();
    todoData = [];
    //渲染畫面
    render(todoData);
};
function removeTodo(id) {
    //代入id，然後再用key值來做比對，才知道要正確刪除哪一筆資料 
    let newIndex = 0;
    todoData.forEach(function (item, key) {
        if (id == item.id) {
            newIndex = key;
        }
    })
    todoData.splice(newIndex, 1);
    render(todoData);
};
function completeTodo(id) {
    todoData.forEach(function (item) {
        if (id == item.id) {
            item.completed = item.completed ? false : true;
        }
    });
    render(todoData);
};
function render(data) {
    let str = '';
    data.forEach(function (item) {
        str += `
        <li class="list-group-item">
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
};

function doSomething(e) {
    let action = e.target.parentNode.dataset.action;
    let id = e.target.parentNode.dataset.id;
    if (action == 'remove') {
        removeTodo(id)
    } else if (action == 'complete') {
        completeTodo(id)
    }
};