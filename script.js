window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todoInput = document.querySelector("#todo-input");

  todoInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    if (todo.content.length < 2) {
      alert("Please write your task in input!");
      return;
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    // Reset the form
    e.target.reset();

    renderTodos();
  });

  renderTodos();
});

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "mb-2",
      "w-75"
    );

    const input = document.createElement("input");
    const content = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.classList.add("form-check-input", "me-2", "cursor-pointer");
    input.checked = todo.done;
    content.classList.add(
      "form-control",
      "flex-fill",
      "text-uppercase",
      "fw-bold",
      "col-2",
      "me-2",
      "w-50"
    );
    content.setAttribute("readonly", "readonly");
    editBtn.classList.add(
      "btn",
      "btn-success",
      "btn-sm",
      "cursor-pointer",
      "me-2"
    );
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "cursor-pointer");

    content.value = todo.content;
    editBtn.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    todoItem.appendChild(input);
    todoItem.appendChild(content);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);

    todoList.appendChild(todoItem);

    if (todo.done) {
      content.classList.add("text-decoration-line-through") &
        content.setAttribute("disabled", true);
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      renderTodos();
    });

    editBtn.addEventListener("click", (e) => {
      if ((todo.done !== true) & (editBtn.innerText.toLowerCase() == "edit")) {
        editBtn.innerText = "Save";
        // const input = content.querySelector("input");
        content.removeAttribute("readonly");
        content.focus();
      }
      content.addEventListener("blur", (e) => {
        editBtn.innerHTML = "Edit";
        content.setAttribute("readonly", "readonly");
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
  });
}
