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

  get todos() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }

  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = templateEngine(todoListHtml, {
      todos: this.todos.map(todo => ({
        ...todo,
        createdAtString: new Date(todo.createdAt).toISOString(),
        updateAtString: new Date(todo.updatedAt).toISOString()
      }))
    });
  }
}

// <section is="mt-todolist">
//   Contenuto del todo list
// </section>
