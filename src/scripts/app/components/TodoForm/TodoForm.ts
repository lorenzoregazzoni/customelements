import { Decorator } from "../../../core/index.js";
import todoFormHtml from "bundle-text:./TodoForm.template.html";
import { TodoItem } from "../../app.types.ts";

class TodoForm extends HTMLElement {
  static extendsElement = "section";

  static attributes = {};

  static events = {
    "todo:submit": function (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const text = this.#input.value.trim();

      if (!text) return;

      const todoItem: TodoItem = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date(),
      };

      const storedTodos = localStorage.getItem("todos");
      const todos = storedTodos ? JSON.parse(storedTodos) : [];
      todos.push(todoItem);
      localStorage.setItem("todos", JSON.stringify(todos));

      this.#form.reset();

      const customEvent = new CustomEvent("todo:add", { detail: todoItem, bubbles: true });
      this.dispatchEvent(customEvent);

      return false;
    },
  };

  static {
    Decorator.componentDecorator(this);
  }

  #form: HTMLFormElement;
  #input: HTMLInputElement;

  constructor() {
    super();
    this.innerHTML = todoFormHtml;
    this.#form = this.querySelector("form")!;
    this.#input = this.querySelector("input[type='text']")!;
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.dispatchEvent(new CustomEvent("todo:submit"));
      return false;
    });
  }
}

// <section is="mt-todoform">
//   Contenuto del form
// </section>
