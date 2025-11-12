import { componentDecorator } from "../../core";

export class Button extends HTMLButtonElement {
  static extendsElement = "button";

  static attributes = {
    color: function (oldValue, newValue) {
      console.log(`Button color changed from ${oldValue} to ${newValue}`);
      // add your logic here
    },
    size: function (oldValue, newValue) {
      console.log(`Button size changed from ${oldValue} to ${newValue}`);
      // add your logic here
    },
  };

  static events = {
    click: function (event) {
      console.log("Button clicked!", event);
      // add your logic here
    },
  };

  // INFO: reflection pattern for attributes
  // get color() {
  //   return this.getAttribute("color");
  // }

  // set color(value) {
  //   this.setAttribute("color", value);
  // }

  static {
    componentDecorator(this);
  }
}

// <button is="mt-button">
//   Testo del Bottone
// </button>
