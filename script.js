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
      "justify-content-between",
      "mb-2"
    );
    todoItem.style.display = "flex";
    todoList.appendChild(todoItem);

    // Selectors
    const input = document.createElement("input");
    const content = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const filterByStatus = document.getElementById("filter");
    const removeAllBtn = document.getElementById("remove-all-btn");
    const removeDone = document.getElementById("remove-done-btn");

    // Add input checkbox "isDone"
    input.type = "checkbox";
    input.classList.add("form-check-input", "me-2", "cursor-pointer");
    input.setAttribute("id", "checkbox");
    input.checked = todo.isDone;
    todoItem.appendChild(input);

    // Add input text "content"
    content.classList.add(
      "form-control",
      "flex-fill",
      "fw-bold",
      "col-2",
      "me-2"
    );
    content.setAttribute("readonly", "readonly");
    content.value = todo.content;
    todoItem.appendChild(content);

    // Add edit button
    editBtn.classList.add(
      "btn",
      "btn-success",
      "btn-sm",
      "cursor-pointer",
      "me-2"
    );
    editBtn.innerHTML = "Edit";
    todoItem.appendChild(editBtn);

    // Add delete button
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "cursor-pointer");
    deleteBtn.innerHTML = "Delete";
    todoItem.appendChild(deleteBtn);

    // Check todo status
    if (todo.isDone) {
      content.classList.add("text-decoration-line-through");
      content.setAttribute("disabled", true);
      todoItem.classList.add("done");
    } else {
      todoItem.classList.remove("done");
    }

    //Event Listeners
    input.addEventListener("change", (e) => {
      todo.isDone = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

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

    filterByStatus.addEventListener("click", (e) => {
      const todos = todoList.childNodes;
      console.log(todos);
      todos.forEach(function (todo) {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            console.log(todo.style.display);
            break;
          case "completed":
            if (todo.classList.contains("done")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
              console.log(todo.style.display);
            }
            break;
          case "need-todo":
            if (!todo.classList.contains("done")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
        }
      });
    });

    removeDone.addEventListener("click", (e) => {
      todos = todos.filter((todo) => !todo.isDone);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });

    removeAllBtn.addEventListener("click", (e) => {
      let start = 1;
      let deleteCount = todos.length;
      todos = todos.splice(start, deleteCount);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });

  });

  // Empty list message
  if (todos.length == 0) {
    document.getElementById("empty-list").innerHTML =
      "Your Todo list empty. Congratulation, you are free!";
    document.getElementById("remove-btn").hidden = true;
  } else {
    document.getElementById("empty-list").innerHTML = "";
    document.getElementById("remove-btn").hidden = false;
  }
}
