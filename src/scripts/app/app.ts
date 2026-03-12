import { Store } from "../core/services/store.ts";
import { domObserver } from "../core/services/domObserver.ts";

import { Decorator, Utils } from "../core/index.js";
import { TodoItem } from "./app.types.ts";
import "./components/index.ts";

import appCss from "bundle-text:./app.css";
import appHtml from "bundle-text:./app.template.html";

export class App extends HTMLElement {
  static extendsElement = "section";

  static attributes = {};

  static events = {
    "todo:add": function (event: CustomEvent) {
      const todoItem = event.detail;

      this._store.todos = new Array(todoItem, ...this._store.todos);

      console.log("Todo item added:", todoItem);
    },
    "todo:update": function (event: CustomEvent) {
      const updatedTodo = event.detail;
      const todos = this._store.todos;
      const index = todos.findIndex((t) => t.id === updatedTodo.id);

      if (index !== -1) {
        todos[index] = updatedTodo;
        // this.todos = todos;
        console.log("Todo item updated:", updatedTodo);
      }
    },
    "todo:remove": function (event: CustomEvent) {
      const id = event.detail;
      this._store.todos = this._store.todos.filter((todo) => todo.id !== parseInt(id));
      console.log("Todo item removed with id:", id);
    },
    "todo:change": function (event: CustomEvent) {
      const id = event.detail;
      const todos = this._store.todos;

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

  _store: { todos: TodoItem[] } = { todos: [] };

  async init() {
    let store = JSON.parse(localStorage.getItem("store") || '{"todos":[]}');

    if (store.todos.length === 0) {
      store.todos = await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          return data.map((item) => {
            return {
              id: item.id,
              title: item.title,
              completed: item.completed,
              createdAt: new Date(),
              updatedAt: new Date(),
              createdAtString: new Date().toISOString(),
              updatedAtString: new Date().toISOString(),
            };
          });
        });
    }
    this._store = Store(store, "todosStore");

    localStorage.setItem("store", JSON.stringify(this._store));

    this.innerHTML = appHtml;

    const observer = domObserver(document.querySelector("section[is='mt-app']"));
  }

  constructor() {
    super();

    this.init();

    self.addEventListener("todosStore", (e) => {
      localStorage.setItem("store", JSON.stringify(this._store));
    });
  }
}

// <section is="mt-app">
//   Contenuto del componente
// </section>
