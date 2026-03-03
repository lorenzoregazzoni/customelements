import { Decorator } from "../../../core/index.js";
import todoItemHtml from "bundle-text:./TodoItem.template.html";

class TodoItem extends HTMLLIElement {
  static extendsElement = "li";

  static attributes = {};

  static events = {};

  static {
    Decorator.componentDecorator(this);
  }

  #label: HTMLLabelElement;
  #input: HTMLInputElement;
  #dateSpan: HTMLSpanElement;
  #button: HTMLButtonElement;

  constructor() {
    super();
    this.innerHTML = todoItemHtml;
    this.#label = this.querySelector("label");
    this.#input = this.querySelector("input[type='checkbox']");
    this.#dateSpan = this.querySelector("span");
    this.#button = this.querySelector("button");

    this.#label.insertAdjacentText("beforeend", this.dataset.text);
    this.#input.checked = this.dataset.completed === "true";
    this.#dateSpan.textContent = `Creato: ${this.dataset.createdAt}`;
    this.#button.setAttribute("aria-label", `Elimina todo: ${this.dataset.text}`);
  }
}

// <li is="mt-todo-item">
//   Contenuto del todo item
// </li>
