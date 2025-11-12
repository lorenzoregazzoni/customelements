import { componentDecorator } from "../../core";

export class Accordion extends HTMLElement {
  static extendsElement = "section";

  static attributes = {
    "data-color": function (oldValue, newValue) {
      console.log(`Accordion data-color changed from ${oldValue} to ${newValue}`);
      // add your logic here
    },
    "font-size": function (oldValue, newValue) {
      console.log(`Accordion font-size changed from ${oldValue} to ${newValue}`);
      // add your logic here
    },
    size: function (oldValue, newValue) {
      console.log(`Accordion size changed from ${oldValue} to ${newValue}`);
      // add your logic here
    },
  };

  static events = {
    click: function (event) {
      console.log("Accordion Detail clicked!", event);
      // add your logic here
    },
    toggle: function (event) {
      console.log("Accordion Detail toggled!", event);
      // add your logic here
    },
  };

  // INFO: reflection pattern for attributes
  // get dataColor() {
  //   return this.getAttribute("data-color");
  // }

  static {
    componentDecorator(this);
  }
}

// <section is="mt-accordion">
//   <details>
//     <summary>Section 1</summary>
//     <p>Content for section 1.</p>
//   </details>
//   <details>
//     <summary>Section 2</summary>
//     <p>Content for section 2.</p>
//   </details>
// </section>
