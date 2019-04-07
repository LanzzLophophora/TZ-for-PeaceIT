(function() {
    function Module () {
        this.name = 'My ToDo list';
        this.version = '1.0.0';
        this.createToDolist = function (options) {
            if (!options.place) {
                return null;
            }
            return new ToDoList(options);
        }
    }

    function ToDoList(options) {
        this.place = typeof options.place === 'string' ? document.querySelector(options.place) : options.place;
        this.place.innerHTML = '';
        this.taskArray = options.taskArray || {};

        var taskList = document.createElement('div');
        taskList.setAttribute('id', 'taskList');
        taskList.className = 'task-list';
        this.place.appendChild(taskList);
        this.taskList = taskList;
        addInputTask(this);
        if (Object.keys(this.taskArray).length !== 0) {
            for (var key in this.taskArray) {
                showTask(this.taskList, this.taskArray[key], this);
            }
        }
    }

    function addInputTask(todoList) {
        var inputField = document.createElement('span'),
            input = document.createElement('input'),
            buttonCreate,
            buttonDelete;
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'task');
        buttonCreate = createButton('Create task!');
        buttonDelete = createButton('Delete task-list!');
        buttonDelete.classList += ' warning';
        addFuncToCreateButton(buttonCreate, input, todoList);
        addFuncToDeleteButton(buttonDelete, todoList);
        input.onkeydown = function(e){
            if (e.key === 'Enter') {
                buttonCreate.onclick();
            }
        };
        inputField.appendChild(input);
        inputField.appendChild(buttonCreate);
        inputField.appendChild(buttonDelete);
        inputField.className = 'input-field w-100 d-flex';
        todoList.place.insertBefore(inputField, todoList.taskList);
    }

    function createButton(name) {
        var button = document.createElement('button');
        button.className = 'button';
        button.textContent = name;
        return button;
    }

    function addFuncToCreateButton(button, input, todoList){
        button.onclick = function () {
            if (input.value.isEmpty()){
                return false;
            }
            var id = randomInteger(0, 10000) + '',
                value = input.value;

            input.value = '';

            todoList.taskArray[id] = {
                id: id,
                value: value,
                done: false
            };

            showTask(todoList.taskList ,todoList.taskArray[id], todoList);
            localStorage.setItem('taskArray', JSON.stringify(todoList.taskArray));
        }
    }

    function addFuncToDeleteButton(buttonDelete, todoList) {
        buttonDelete.onclick = function () {
            if (confirm('Are you sure?')) {
                todoList.taskArray = {};
                localStorage.setItem('taskArray', JSON.stringify(toDoList.taskArray));
                todoList.taskList.innerHTML = '';
            }
        }
    }

    function showTask(place, task, toDoList) {

        var value = task.value,
            id = task.id,
            taskSpan = document.createElement('span'),
            span = document.createElement('span'),
            doneButton,
            deleteButton;
        doneButton = createButton('done');
        doneButton.classList += ' done-button';
        deleteButton = createButton('delete');
        deleteButton.classList += ' delete-button';

        span.textContent = value;
        taskSpan.appendChild(doneButton);
        taskSpan.appendChild(span);
        taskSpan.appendChild(deleteButton);

        if(task.done) {
            taskSpan.classList += 'done';
        }

        addFuncToDoneButton(doneButton, toDoList, id);
        addFuncTodeleteButton(deleteButton, toDoList, id);

        place.appendChild(taskSpan);
    }

    function addFuncToDoneButton(button, todoList, id) {
        button.onclick = function () {
            button.parentNode.classList.toggle('done');
            todoList.taskArray[id].done = todoList.taskArray[id].done!==true;
            localStorage.setItem('taskArray', JSON.stringify(todoList.taskArray));
        }
    }

    function addFuncTodeleteButton(button, toDoList, id) {
        button.onclick = function () {
            if (button.parentNode.className.indexOf('done') < 0){
                if(confirm('This task has not yet been completed. Do you really want to delete it?')) {
                    button.parentNode.remove();
                    delete toDoList.taskArray[id];
                    localStorage.setItem('taskArray', JSON.stringify(toDoList.taskArray));
                }
            } else {
                button.parentNode.remove();
                delete toDoList.taskArray[id];
                localStorage.setItem('taskArray', JSON.stringify(toDoList.taskArray));
            }
        }
    }

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    String.prototype.isEmpty = function() {
        return (this.length === 0 || !this.trim());
    };
    window.myToDoList = new Module();
})();
