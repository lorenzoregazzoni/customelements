import { Decorator } from "../../../core/index.js";
import todoListHtml from "bundle-text:./TodoList.template.html";

class TodoList extends HTMLElement {
  static extendsElement = "section";

  static attributes = {};

  static events = {};

  static {
    Decorator.componentDecorator(this);
  }

  #ul: HTMLUListElement;
  #emptyMessage: HTMLParagraphElement;

  constructor() {
    super();
    this.innerHTML = todoListHtml;
    this.#ul = this.querySelector("ul");
    this.#emptyMessage = this.querySelector("p");

    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];

    for (const todo of todos) {
        const todoItemHtml = 
            `<li is="mt-todoitem"
                data-text="${todo.text}"
                data-completed="${todo.completed}"
                data-created-at="${new Date(todo.createdAt).toLocaleString()}">
            </li>`;
        this.#ul.insertAdjacentHTML("beforeend", todoItemHtml);
    }
  }
}

// <section is="mt-todolist">
//   Contenuto del todo list
// </section>
