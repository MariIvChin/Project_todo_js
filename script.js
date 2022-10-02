window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todoInput = document.querySelector("#todo-input");

  todoInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      isDone: false,
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
      "mb-2"
    );

    const input = document.createElement("input");
    const content = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.classList.add("form-check-input", "me-2", "cursor-pointer");
    input.checked = todo.isDone;
    content.classList.add(
      "form-control",
      "flex-fill",
      "fw-bold",
      "col-2",
      "me-2"
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

    if (todo.isDone) {
      content.classList.add("text-decoration-line-through") &
        content.setAttribute("disabled", true);
    }

    input.addEventListener("change", (e) => {
      todo.isDone = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.isDone) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      renderTodos();
    });

    editBtn.addEventListener("click", (e) => {
      if (
        (todo.isDone !== true) &
        (editBtn.innerText.toLowerCase() == "edit")
      ) {
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

    const removeAllBtn = document.getElementById("remove-all-btn");
    removeAllBtn.addEventListener("click", (e) => {
      let start = 1;
      let deleteCount = todos.length;
      todos = todos.splice(start, deleteCount);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });

    const removeDone = document.getElementById("remove-done-btn");
    removeDone.addEventListener("click", (e) => {
      todos = todos.filter((todo) => !todo.isDone);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
  });

  if (todos.length == 0) {
    document.getElementById("empty-list").innerHTML =
      "Your Todo list empty. Congratulation, you are free!";
    document.getElementById("remove-btn").hidden = true;
  } else {
    document.getElementById("empty-list").innerHTML = "";
    document.getElementById("remove-btn").hidden = false;
  }

  const filterByStatus = document.getElementById("filter");
  filterByStatus.addEventListener("select", (e) => {
    if (filterByStatus === 1) {
      todos.filter((todo) => todo.isDone);
    }
    if (filterByStatus === 2) {
      todos.filter((todo) => !todo.isDone);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  });
}
