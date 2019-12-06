let todos = [
    {   id: 1, subject: 'Presentation Slides', description: 'I want to design my presentation slide, \
        add VFD logo to the master slide, surf the Internet, conduct research and outline research \
        findings to the slides'},
    {   id: 2, subject: "Reply Nonso Okpala's mail", description: "I want to reply Nonso Okpala's mail \
        on the need for deploying a new approach to accessing the companies data from the database"},
    {   id: 3, subject: "Call Azubuike Emodi", description: "I want to call Zuby, telling him why the work \
        can not be done at the requested time and the best approach to get it done earlier"}
];
let doneTodos = []; 

const todoSubject = document.querySelector('#subject');
const todoDescription = document.querySelector('#description');
const updateTodoSubject = document.querySelector('#update_subject');
const updateTodoDescription = document.querySelector('#update_description');
const submitTodo = document.querySelector('#submit_todo');
const submitBtn = document.querySelector('#submitbtn');
const editTodo = document.querySelector('#edit_todo');
const viewTodo = document.querySelector('#view_todo');
const deleteTodo = document.querySelector('#delete_todo');
const errorBox = document.querySelector('#error_box');
const successBox = document.querySelector('#success_box');
const updateErrorBox = document.querySelector('#update_error_box');
const updateSuccessBox = document.querySelector('#update_success_box');
const updateWindow = document.querySelector('.update_window');
const viewWindow = document.querySelector('.view_window');
const viewSubject = document.querySelector('#view_subject');
const viewDescription = document.querySelector('#view_description');
let updateId;

class MyToDo {
    constructor () {

    }

    createTodo = () => {
        if (todoSubject.value === " " || todoSubject.value === null || todoSubject.value === "" ||
             todoDescription.value === " " || todoDescription.value === null || todoDescription.value === "") {
            successBox.textContent = ``;
            errorBox.textContent = `ERROR: Some field need to be filled`;
        } else {
            todos.push({id: todos.length + 1, subject: todoSubject.value.trim(), description: todoDescription.value.trim()});
            errorBox.textContent = ``;
            successBox.textContent = `To Do Created Successfully!`;
            todoSubject.value = '';
            todoDescription.value = '';
            this.readAllTodo();
        }
    }

    readAllTodo = () => {
        let displayedTodos = '';
        todos.forEach((todo, index) => {
            let counter = index + 1;
            displayedTodos += `<p>
                ${counter}. <a href=javascript:void(0) onclick="modifyTodoList('view', ${todo.id})">
                ${todo.subject.substring(0,20)}...</a> ${todo.description.substring(0,60)}... 
                <button type="button" class="todo_buttons" onclick="modifyTodoList('edit', ${todo.id})">Edit</button> 
                <button type="button" class="todo_buttons" onclick="modifyTodoList('delete', ${todo.id})">Delete</button>
                <button type="button" class="todo_buttons" onclick="modifyTodoList('complete', ${todo.id})">Done</button></p>`;
        })
        document.getElementById('displayTodoList').innerHTML = displayedTodos;
    }

    readATodo = (id) => {
        updateWindow.style.display = 'none';
        viewWindow.style.display = 'block';
        const todo = this.findTodo(id);
        viewSubject.innerHTML = todo.subject;
        viewDescription.innerHTML = todo.description;

    }

    findTodo = (id) => {
        return todos.find(todo => todo.id == id);
    }

    setUpdateWindow = (id) => {
        viewWindow.style.display = 'none';
        updateWindow.style.display = 'block';
        updateErrorBox.textContent = '';
        updateSuccessBox.textContent = '';
        const todo = this.findTodo(id);
        const index = todos.findIndex(todo => todo.id == id);
        updateTodoSubject.value = todo.subject;
        updateTodoDescription.value = todo.description;
        updateId = id
    }

    deleteTodo = (id) => {
        const index = todos.findIndex(todo => todo.id == id);
        let confirmDelete = confirm(`Are you sure you want to delete "${todos[index].subject}" from To-Do list?`);
        if(confirmDelete) {
            todos.splice(index, 1);
	        this.readAllTodo();
        }
    }

    deleteDoneTodo = (id) => {
        const index = doneTodos.findIndex(todo => todo.id == id);
        let confirmDelete = confirm(`Are you sure you want to delete "${doneTodos[index].subject}" from completed To-Do list?`);
        if(confirmDelete) {
            doneTodos.splice(index, 1);
	        this.displayDoneTodos();
        }
    }

    doneTodo = (id) => {
        const todo = this.findTodo(id);
        const index = todos.findIndex(todo => todo.id == id);
        doneTodos.push(todo);
        todos.splice(index, 1);
        this.readAllTodo();
        this.displayDoneTodos();
    }

    undoneTodo = (id) => {
        const doneTodo = doneTodos.find(todo => todo.id == id);
        const index = doneTodos.findIndex(todo => todo.id == id);
        todos.push(doneTodo);
        doneTodos.splice(index, 1);
        this.readAllTodo();
        this.displayDoneTodos();
    }

    displayDoneTodos = () => {
        let displayedDoneTodos = '';
        doneTodos.forEach((todo, index) => {
            let counter = index + 1;
            displayedDoneTodos += `<p>
                ${counter}. ${todo.subject.substring(0,20)}... ${todo.description.substring(0,60)}...  
                <button type="button" class="todo_buttons" onclick="modifyTodoList('incomplete', ${todo.id})">Undone</button>
                <button type="button" class="todo_buttons" onclick="modifyTodoList('delete_done', ${todo.id})">Delete</button></p>`;
        })
        document.getElementById('displayDoneTodoList').innerHTML = displayedDoneTodos;
    }

}

const myToDo = new MyToDo;

(startApp = () => {
    myToDo.readAllTodo();
    submitTodo.addEventListener("click", myToDo.createTodo);
    document.querySelector('#close_view').addEventListener("click", () => {
        viewWindow.style.display = 'none';
    });

    document.querySelector('#close_view_button').addEventListener("click", () => {
        viewWindow.style.display = 'none';
    });

    document.querySelector('#close_update').addEventListener("click", () => {
        updateWindow.style.display = 'none';
    });

    document.querySelector('#cancel_button').addEventListener("click", () => {
        updateWindow.style.display = 'none';
    });

    document.querySelector('#updatebtn').addEventListener('click', () => {
        const index = todos.findIndex(todo => todo.id == updateId);
        if (updateTodoSubject.value == " " || updateTodoSubject.value == null || updateTodoSubject.value == "" ||
            updateTodoDescription.value == " " || updateTodoDescription.value == null || updateTodoDescription.value == "") {
            updateSuccessBox.textContent = '';
            updateErrorBox.textContent = 'ERROR: Some field need to be filled';
        } else {
            todos[index].subject = updateTodoSubject.value.trim();
            todos[index].description = updateTodoDescription.value.trim();
            updateErrorBox.textContent = '';
            updateSuccessBox.textContent = 'Todo Edited Successfully';
            updateTodoSubject.value = '';
            updateTodoDescription.value = '';
            myToDo.readAllTodo();
        }
    });

})();

const modifyTodoList = (action, id) => {
    switch (action) {
        case 'view':
            myToDo.readATodo(id);
            break;
    
        case 'edit':
            myToDo.setUpdateWindow(id);
            break;
    
        case 'delete':
            myToDo.deleteTodo(id);
            break;
    
        case 'delete_done':
            myToDo.deleteDoneTodo(id);
            break;
    
        case 'complete':
            myToDo.doneTodo(id);
            break;
    
        case 'incomplete':
            myToDo.undoneTodo(id);
            break;
    
        default:
            break;
    }
}