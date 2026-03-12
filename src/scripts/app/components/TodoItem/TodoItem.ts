import { Decorator } from "../../../core/index.js";
import templateEngine from "../../../core/services/templateEngine.ts";
import todoItemHtml from "bundle-text:./TodoItem.template.html";

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
    },
  };

  static {
    Decorator.componentDecorator(this);
  }

  constructor() {
    super();
    this.#render();

    self.addEventListener("dom:mutation", (e: CustomEvent) => {
      if (e.detail.target === this && e.detail.type === "attributes") {
        this.#render();
      }
    });
  }

  #render() {
    const todoItemHtmlTemp = todoItemHtml.replaceAll('=""', "");
    this.innerHTML = templateEngine(todoItemHtmlTemp, this.dataset);
  }
}

// <li is="mt-todo-item">
//   Contenuto del todo item
// </li>
