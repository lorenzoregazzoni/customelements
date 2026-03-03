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
      debugger;
      const todoItem = event.detail;
      console.log("Todo item added:", todoItem);
    }
  };

  static {
    Decorator.componentDecorator(this);
    Utils.registerStylesheet(appCss);
  }

  constructor() {
    super();
    this.innerHTML = appHtml;
  }
}

// <section is="mt-app">
//   Contenuto del componente
// </section>