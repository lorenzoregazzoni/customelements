import { Store } from "../core/services/store.ts";
import { domObserver } from "../core/services/domObserver.ts";

import { Decorator, Utils } from "../core/index.js";
import { TodoItem } from "../app.types.ts";
import "./components/index.ts";

import appCss from "bundle-text:./app.css";
import appHtml from "bundle-text:./app.template.html";

export class App extends HTMLElement {
  static extendsElement = "section";

  static attributes = {};

  static events = {
    "todo:add": function (event: CustomEvent) {
      const todoItem = event.detail;

      const todos = this.todos;
      todos.push(todoItem);
      // this.todos = todos;

      // this.#todoList.render();

      console.log("Todo item added:", todoItem);
    },
    "todo:update": function (event: CustomEvent) {
      const updatedTodo = event.detail;
      const todos = this.todos;
      const index = todos.findIndex((t) => t.id === updatedTodo.id);

      if (index !== -1) {
        todos[index] = updatedTodo;
        // this.todos = todos;
        console.log("Todo item updated:", updatedTodo);
      }
    },
    "todo:remove": function (event: CustomEvent) {
      const id = event.detail;
      
      debugger;
      this.todos = this.todos.filter((todo) => todo.id !== parseInt(id));
      
      console.log("Todo item removed with id:", id);
    },
    "todo:change": function (event: CustomEvent) {
      const id = event.detail;
      const todos = this.todos;

      const todoItem = todos.find((t) => t.id === parseInt(id));

      if (todoItem) {
        todoItem.completed = !todoItem.completed;

        // this.todos = todos;
        console.log("Todo item changed with id:", id);
      }
    },
  };

  static {
    Decorator.componentDecorator(this);
    Utils.registerStylesheet(appCss);
  }

  #todos: TodoItem[] = [];
  #todoList: HTMLElement;

  get todos() {
    return this.#todos;
  }

  set todos(todos) {
    this.#todos = todos;
  }

  constructor() {
    super();

    this.innerHTML = appHtml;
    this.#todos = Store(JSON.parse(localStorage.getItem("todos") || "[]"), "todosStore");
    this.#todoList = this.querySelector("section[is='mt-todolist']");

    const observer = domObserver(document.querySelector("section[is='mt-app']"));

    self.addEventListener("todosStore", (e) => {
      localStorage.setItem("todos", JSON.stringify(this.#todos));
    });
  }
}

// <section is="mt-app">
//   Contenuto del componente
// </section>
