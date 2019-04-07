if (!localStorage.getItem('taskArray')) {
    var buttonCreate = document.createElement('button');
    buttonCreate.className = 'button';
    buttonCreate.textContent = 'Create ToDo list!';
    buttonCreate.onclick = function (){
        var toDoList = myToDoList.createToDolist({
            place: toDo,
        });
    };
    toDo.appendChild(buttonCreate);
} else {
    var toDoList = myToDoList.createToDolist({
        place: toDo,
        taskArray: JSON.parse(localStorage.getItem('taskArray')),
    });
}
