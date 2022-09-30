const todoManager = new Todo();

const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-btn");
const removeAllBtn = document.getElementById("remove-all-btn");
const todoList = document.getElementById("todo-list");
const errorMessage = document.getElementById("error-message");

todoBtn.addEventListener("click", addTodo);

todoList.addEventListener("click", function (e) {
  const todoId = Number(e.target.closest("li[data-todo-id]").dataset.todoId);
  const shouldRemove = e.target.classList.contains("bi-trash");

  if (shouldRemove) {
    todoManager.remove(todoId);
  } else {
    todoManager.changeDone(todoId);
  }
  renderList();
});

removeAllBtn.addEventListener("click", function (e) {
  // const todoId = Number(e.target.closest("li[data-todo-id]").dataset.todoId);
  const shouldRemove = e.target.classList.contains("bi-trash");
  if (shouldRemove) {
    todoManager.removeAll();
  }
  return;
});

function addTodo() {
  try {
    todoManager.add(/* todoManager */ todoInput.value);
    resetInput();
    clearErrorMessage();
    renderList();
    todoInput.focus();
  } catch (err) {
    setErrorMessage(err.message);
  }
}

function renderList() {
  const todos = todoManager.getTodos();
  // refreshStatus();
  let html = "";
  for (const todo of todos) {
    html += `<li data-todo-id="${
      todo.id
    }" class="list-group-item d-flex justify-content-between cursor-pointer">
    <input
      class="form-check-input me-2 cursor-pointer"
      type="checkbox"
      ${todo.isDone ? "checked" : ""}
    />
    <span class="flex-fill text-uppercase fw-bold col-2
      ${todo.isDone ? "text-decoration-line-through" : ""}">
      ${todo.text}
      </span
      >
      <span class="flex-fill col-4">14.09.2022 15:30:10</span>
      <button
        id="edit-btn"
        class="btn btn-success btn-sm cursor-pointer"
      >
        <i class="bi bi-pencil"></i>
      </button>
      <button
        id="remove-btn"
        class="btn btn-danger btn-sm cursor-pointer"
      >
        <i class="bi bi-trash text-Light"></i>
      </button>
      </li>`;
  }
  todoList.innerHTML = html;
}

function resetInput() {
  todoInput.value = "";
}

function setErrorMessage(error) {
  errorMessage.innerHTML = `<span>${error}</span>`;
}

function clearErrorMessage() {
  errorMessage.innerHTML = "";
}

// todoBtn.addEventListener("click", todoManager.add);

// function addEventListener(eventName, functionToRun) {
//   functionToRun(/* undefine/window */ new Event());
// }

// function refreshStatus() {
//   const amountDone = todoManager.getTodos().reduce((completedTodos, todo) => {
//     console.log(completedTodos, todo);
//     return todo.isDone ? completedTodos + 1 : completedTodos;
//   }, 0);

//   todoStatus.innerHTML = `${amountDone}/${todoManager.getTodos().length}`;
// }

// const amountDone = todoManager.getTodos().filter((todo) => todo.isDone).length;
