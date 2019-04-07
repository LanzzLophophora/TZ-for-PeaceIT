/*var buttonCreate = document.createElement('button');
buttonCreate.className = 'button';
buttonCreate.textContent = 'Create ToDo list!';
buttonCreate.onclick = function (){
    var toDoList = myToDoList.createToDolist(toDo);
};
toDo.appendChild(buttonCreate);*/


if (!localStorage.getItem('ToDoList')) {
    var buttonCreate = document.createElement('button');
    buttonCreate.className = 'button';
    buttonCreate.textContent = 'Create ToDo list!';
    buttonCreate.onclick = function (){
        var toDoList = myToDoList.createToDolist(toDo);
    };
    toDo.appendChild(buttonCreate);
} else {
    var toDoList = localStorage.getItem('ToDoList');
    toDoList = JSON.parse(toDoList);
    console.log(toDoList);
    toDo.appendChild(toDoList);
}
