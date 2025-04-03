let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveButton = document.getElementById("saveButton");

function setTodoList() {
  let stringifyValue = localStorage.getItem("todoList");
  let parseList = JSON.parse(stringifyValue);
  if (parseList === null) {
    return [];
  } else {
    return parseList;
  }
}
let todoList = setTodoList();

let todoCount = todoList.length;

saveButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onTodoStatusChange(checkboxId, labelId) {
  let checkboxElement = document.getElementById(checkboxId);
  let label = document.getElementById(labelId);

  label.classList.toggle("checked");
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);

  todoItemsContainer.removeChild(todoElement);
}

function createAndAppendTodo(todo) {
  let checkboxId = "Checkbox" + todo.uniqueId;
  let labelId = "label" + todo.uniqueId;
  let todoId = "todo" + todo.uniqueId;

  //LIST
  let todoListContainer = document.createElement("li");
  todoListContainer.classList.add("todo-list-container", "d-flex", "flex-row");
  todoListContainer.id = todoId;
  todoItemsContainer.appendChild(todoListContainer);
  //INPUT
  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId);
  };
  inputElement.classList.add("checkbox-input");
  todoListContainer.appendChild(inputElement);
  //LABELDIVCONTAINER
  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex");
  todoListContainer.appendChild(labelContainer);
  //LABEL
  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.classList.add("checkbox-label");
  labelElement.id = labelId;
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);
  //DELETEICON
  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
}
for (let todo of todoList) {
  createAndAppendTodo(todo);
}

function onAddTodo() {
  let userInputElement = document.getElementById("todosUserInput");
  let userInputValue = userInputElement.value;
  if (userInputValue === "") {
    alert("Enter Valid Text");
  }
  let newTodo = {
    text: userInputValue,
    uniqueId: todoCount,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputValue = "";
}
addTodoButton.onclick = function () {
  onAddTodo();
};
