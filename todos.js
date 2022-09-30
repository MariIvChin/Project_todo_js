class Todo {
  currentId = 0;

  todos = [
    // {
    //   id: 1,
    //   text: "Sleep",
    //   isDone: false,
    //   createdAt: new Date(),
    // },
  ];

  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    localStorage.setItem("currentId", this.currentId);
  }

  load() {
    if (localStorage.getItem("todos")) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      this.currentId = Number(localStorage.getItem("currentId"));
    }
  }

  // METHODs (Todo.prototype.*)
  add(/* this */ text) {
    if (typeof text !== "string" || text.length < 2) {
      throw new Error("Task must be at least two characters");
    }

    const todo = {
      id: this.currentId++,
      text,
      isDone: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);
    this.save();
    return todo;
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id) {
    if (typeof id !== "number") {
      throw new Error("ID must be a number!");
    }
    for (let todo of this.todos) {
      if (todo.id === id) {
        const task = this.todos.indexOf(todo);
        return task;
      }
    }
    throw new Error("Id not found!");
  }

  // getTodo(/* this */ id) {
  //   // find the todo inside todos
  //   const found = this.todos.find((todo) => todo.id === id);

  //   if (found) {
  //     return found;
  //   }

  //   // if not found throw error
  //   throw new Error("id was not found");
  // }

  remove(/* this */ id) {
    if (typeof id !== "number") {
      throw new Error("ID must be a number!");
    }
    this.todos.splice(this.getTodo(id), 1);
    this.save();
  }

  removeAll() {
    this.getTodos([""]);
    this.save();
  }

  // remove(/* this */ id) {
  //   this.todos = this.todos.filter((todo) => todo.id !== id);

  //   this.save();

  //   // return the removed item
  //   return removedElements[0]; // take the first one because with remove I am sure I am only removing one item.
  // }

  // remove(/* this */ id) {
  //   const removedTodo = this.getTodo(id);
  //   this.todos = this.todos.filter((todo) => todo.id !== id);

  //   this.save();

  //   // return the removed item
  //   return removedTodo;
  // }

  changeDone(/* this */ id, isDone = null) {
    if (typeof id !== "number") {
      throw new Error("ID must be a number!");
    }
    for (let todo of this.todos) {
      if (todo.id === id) {
        todo.isDone = typeof isDone === "boolean" ? todo.isDone : !todo.isDone;
        this.save();
        return;
      }
    }
  }

  // changeDone(/* this */ id, isDone = null) {
  //   const updatedTodo = this.getTodo(id);

  //   this.todos = this.todos.map((todo) => {
  //     if (todo.id === id) {
  //       todo.isDone = typeof isDone === "boolean" ? isDone : !todo.isDone;
  //     }

  //     return todo;
  //   });

  //   this.save();

  //   // return todo
  //   return updatedTodo;
  // }

  // clear(isDone = null) {
  //   if (typeof isDone === "boolean") {
  //     this.todos = this.todos.filter((todo) => todo.isDone !== isDone);
  //   } else {
  //     this.todos = [];
  //   }

  //   this.save();
  // }
}
