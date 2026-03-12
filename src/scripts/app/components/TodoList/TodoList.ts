import { Decorator } from "../../../core/index.js";
import todoListHtml from "bundle-text:./TodoList.template.html";
import templateEngine from "../../../core/services/templateEngine.ts";

class TodoList extends HTMLElement {
  static extendsElement = "section";

  static attributes = {};

  static events = {};

  static {
    Decorator.componentDecorator(this);
  }

  constructor() {
    super();
    this.render(JSON.parse(localStorage.getItem("store") || '{"todos":[]}'));

    self.addEventListener("todosStore", (e: CustomEvent) => {
      //if(e.detail.type === "updateArray") {
        this.render(e.detail.dataSource);
      //}
    });
  }

  render(store) {
    this.innerHTML = templateEngine(todoListHtml, store);
  }
}

// <section is="mt-todolist">
//   Contenuto del todo list
// </section>
