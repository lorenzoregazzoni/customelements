import { Decorator } from "../../../core/index.js";
import todoItemHtml from "bundle-text:./TodoItem.template.html";
import templateEngine from "../../../core/services/templateEngine";

class TodoItem extends HTMLLIElement {
  static extendsElement = "li";

  static attributes = {};

  static events = {
    click: function (e) {
      if (e.target instanceof HTMLButtonElement) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        const id = this.dataset.id;
        const customEvent = new CustomEvent("todo:remove", { detail: id, bubbles: true });
        this.dispatchEvent(customEvent);
        this.remove();
      }
    },
    change: function (e) {
      if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
        const id = this.dataset.id;
        const customEvent = new CustomEvent("todo:change", { detail: id, bubbles: true });
        this.dispatchEvent(customEvent);
      }
    }
  };

  static {
    Decorator.componentDecorator(this);
  }

  constructor() {
    super();
    this.#render();
  }

  #render() {
    this.innerHTML = templateEngine(todoItemHtml, this.dataset);
  }
}

// <li is="mt-todo-item">
//   Contenuto del todo item
// </li>
