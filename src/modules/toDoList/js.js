(function() {
    function Module () {
        this.name = 'My ToDo list';
        this.version = '1.0.0';
        this.createToDolist = function (place) {
            if (!place) {
                return null;
            }
            return new ToDoList(place);
        }
    }

    function ToDoList(place) {
        this.place = typeof place === 'string' ? document.querySelector(place) : place;
        this.place.innerHTML = '';
        // this.taskArray = [];


        addInputTask(this.place);

        var taskList = document.createElement('div');
        taskList.setAttribute('id', 'taskList');
        taskList.className = 'task-list';
        this.place.appendChild(taskList);

        localStorage.setItem('ToDoList', JSON.stringify(taskList));
    }

    function addInputTask(place) {
        var inputField = document.createElement('span'),
            input = document.createElement('input'),
            buttonCreate;
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'task');
        buttonCreate = createButton('Create task!');
        addFuncToCreateButton(buttonCreate, input);
        inputField.appendChild(input);
        inputField.appendChild(buttonCreate);
        inputField.className = 'input-field w-100 d-flex';
        place.appendChild(inputField);
    }

    function createButton(name) {
        var button = document.createElement('button');
        button.className = 'button';
        button.textContent = name;
        return button;
    }

    String.prototype.isEmpty = function() {
        return (this.length === 0 || !this.trim());
    };

    function addFuncToCreateButton(button, input){
        button.onclick = function () {
            if (input.value.isEmpty()){
                return false;
            }
            var value = input.value,
                task = document.createElement('span'),
                span = document.createElement('span'),
                doneButton,
                deleteButton;
            doneButton = createButton('done');
            doneButton.classList += ' done-button';
            deleteButton = createButton('delete');
            deleteButton.classList += ' delete-button';

            span.textContent = value;
            task.appendChild(doneButton);
            task.appendChild(span);
            task.appendChild(deleteButton);

            addFuncToDoneButton(doneButton);
            addFuncTodeleteButton(deleteButton);
            taskList.appendChild(task);
            input.value = '';
        }
    }

    function addFuncToDoneButton(button) {
        button.onclick = function () {
            button.parentNode.classList.toggle('done');
        }
    }

    function addFuncTodeleteButton(button) {
        button.onclick = function () {
            if (button.parentNode.className.indexOf('done') < 0){
                if(confirm('This task has not yet been completed. Do you really want to delete it?')) {
                    button.parentNode.remove();
                }
            } else {
                button.parentNode.remove();
            }
        }
    }

    window.myToDoList = new Module();
})();


/*
(function() {
    function Module () {
        this.name = 'My ToDo list';
        this.version = '1.0.0';

        this.createToDolist = function (place) {
            if (!place) {
                return null;
            }
            return new ToDoList(place);
        }
    }

    function ToDoList(place) {
        this.place = typeof place === 'string' ? document.querySelector(place) : place;
        this.place.innerHTML = '';
        this.taskList = [];
        this.addInputTask = addInputTask(this);

        var taskListPlace = document.createElement('div');

        taskListPlace.setAttribute('id', 'taskList');
        taskListPlace.className = 'task-list';
        this.place.appendChild(taskListPlace);

        localStorage.setItem('ToDoList', JSON.stringify(this.taskList));

    }

    function addInputTask(list) {
        var inputField = document.createElement('span'),
            input = document.createElement('input'),
            buttonCreate;
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'task');
        buttonCreate = createButton('Create task!');
        addFuncToCreateButton(buttonCreate, input, list);
        inputField.appendChild(input);
        inputField.appendChild(buttonCreate);
        inputField.className = 'input-field w-100 d-flex';
        list.place.appendChild(inputField);

        list.taskList.push(inputField);
    }

    function createButton(name) {
        var button = document.createElement('button');
        button.className = 'button';
        button.textContent = name;
        return button;
    }

    function addFuncToCreateButton(button, input, list){
        button.onclick = function () {
            var value = input.value,
                task = document.createElement('span'),
                span = document.createElement('span'),
                doneButton,
                deleteButton;
            doneButton = createButton('done');
            doneButton.classList += ' done-button';
            deleteButton = createButton('delete');
            deleteButton.classList += ' delete-button';

            span.textContent = value;
            task.appendChild(doneButton);
            task.appendChild(span);
            task.appendChild(deleteButton);


            addFuncToDoneButton(doneButton, list);
            addFuncTodeleteButton(deleteButton, list);

            // console.log(value);
            list.taskList.appendChild(task);
            input.value = '';
        }
    }

    function addFuncToDoneButton(button, list) {
        button.onclick = function () {
            button.parentNode.classList.toggle('done');
            localStorage.setItem(list.taskList);
        }
    }

    function addFuncTodeleteButton(button, list) {
        button.onclick = function () {
            if (button.parentNode.className.indexOf('done') < 0){
                if(confirm('This task has not yet been completed. Do you really want to delete it?')) {
                    button.parentNode.remove();
                    list.taskList.delete;
                }
            } else {
                button.parentNode.remove();
            }
        }
    }

    window.myToDoList = new Module();
})();*/

