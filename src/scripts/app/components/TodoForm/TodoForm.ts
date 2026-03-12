import { Decorator } from "../../../core/index.js";
import todoFormHtml from "bundle-text:./TodoForm.template.html";
import { TodoItem } from "../../app.types.ts";

class TodoForm extends HTMLElement {
  static extendsElement = "section";

  static attributes = {};

  static events = {
    "submit": function (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const title = this.input.value.trim();

      if (!title) return;

      const todoItem: TodoItem = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdAtString: new Date().toISOString(),
        updatedAtString: new Date().toISOString(),
      };

      this.form.reset();

      const customEvent = new CustomEvent("todo:add", { detail: todoItem, bubbles: true });
      this.dispatchEvent(customEvent);

      return false;
    },
  };

  static {
    Decorator.componentDecorator(this);
  }

  get form() {
    return this.querySelector("form")!;
  }

  get input() {
    return this.querySelector("input[type='text']")!;
  }

  constructor() {
    super();
    this.#render();
  }

  #render() {
    this.innerHTML = todoFormHtml;
  }
}

// <section is="mt-todoform">
//   Contenuto del form
// </section>
