import { Decorator, Utils } from "../core/index.js";
import "./components/index.ts";
import appCss from 'bundle-text:./app.css';
import appHtml from 'bundle-text:./app.template.html';


export class App extends HTMLElement {
  static extendsElement = "section";

  static attributes = {
  };

  static events = {
    "todo:add": function (event: CustomEvent) {
      const todoItem = event.detail;
      const todoList = this.todos;
      todoList.push(todoItem);
      this.todos = todoList;
      this.#todoList.render();
      console.log("Todo item added:", todoItem);
    },
    "todo:remove": function (event: CustomEvent) {
      const id = event.detail;
      this.todos = this.todos.filter((todo) => todo.id !== parseInt(id));
      console.log("Todo item removed with id:", id);
    },
    "todo:change": function (event: CustomEvent) {
      const id = event.detail;
      const todoList = this.todos;
      const todo = todoList.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.completed = !todo.completed;
        this.todos = todoList;
        console.log("Todo item changed with id:", id);
      }
    }
  };

  static {
    Decorator.componentDecorator(this);
    Utils.registerStylesheet(appCss);
  }

  #todoList: HTMLElement;

  get todos() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }

  set todos(todolist) {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }

  constructor() {
    super();
    this.innerHTML = appHtml;
    this.#todoList = this.querySelector("section[is='mt-todolist']");
  }
}

// <section is="mt-app">
//   Contenuto del componente
// </section>