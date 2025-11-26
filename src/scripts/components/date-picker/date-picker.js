import { Decorator, Utils } from "../../core";
import datePickerCss from "bundle-text:./date-picker.css";
import datePickerTemplate from "bundle-text:./date-picker.template.html";

export class DatePicker extends HTMLInputElement {
  static isAttribute = "mt-date-picker";
  static extendsElement = "input";

  static attributes = {};

  static events = {};

  static {
    Decorator.componentDecorator(this);
    Utils.registerStylesheet(datePickerCss);
  }

  #label;
  #inputWrapper;
  #calendarSection;

  get variant() {
    return this.getAttribute("variant");
  }

  set variant(value) {
    this.setAttribute("variant", value);
  }

  constructor() {
    super();

    this.type = "datetime-local";

    // Create calendar component template
    const parser = new DOMParser();
    const datePickerTemplateDoc = parser.parseFromString(
      datePickerTemplate.replace(/\{\{labelText\}\}/g, this.ariaLabel ?? "Select date"),
      "text/html",
    );
    datePickerTemplateDoc.querySelectorAll("script").forEach((script) => script.remove());
    const datePickerTemplateHTML = datePickerTemplateDoc.body.innerHTML;
    console.log(datePickerTemplateHTML);

    // Insert calendar component template before this (input)
    this.insertAdjacentHTML("beforebegin", datePickerTemplateHTML);
    this.#label = this.previousElementSibling;
    this.#inputWrapper = this.#label.querySelector("[input-wrapper]");
    this.#calendarSection = this.#label.querySelector("section");
    this.renderCalendar();


    // Append this (input) into wrapper span
    // this.#inputWrapper.prepend(this);
    // Alternativa ma per coerenza usiamo insert adijacentElement
    this.#inputWrapper.insertAdjacentElement("afterbegin", this);

    if (this.variant === "inline") {
      this.#inputWrapper.setAttribute("sr-only", "");
      this.type = "hidden";
    }
  }

  renderCalendar(month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
    this.#calendarSection.querySelector("tbody").innerHTML = "";
    const firstDate = new Date(`${year}-${(month).toString().padStart(2, "0")}-01`);
    const firstDateOfNextMonth = new Date(`${year}-${(month + 1).toString().padStart(2, "0")}-01`);
    const firstDayOfWeek = firstDate.getDay();
    const daysInMonth = firstDateOfNextMonth.addDays(-1).getDate();

    console.log({ firstDate, firstDayOfWeek, daysInMonth });
    
    // let date = 1;
    // for (let i = 0; i < 7; i++) {
    //   const row = document.createElement("tr");
    //     for (let j = 0; j < 7; j++) {
    //         if (i === 0 && j < firstDay) {
    //             const cell = document.createElement("td");
    //             cell.textContent = "";
    //             row.appendChild(cell);
    //         } else if (date > daysInMonth) {
    //             break;
    //         } else {
    //             const cell = document.createElement("td");
    //             cell.textContent = date;
    //             row.appendChild(cell);
    //             date++;
    //         }
    //     }
    //     this.#calendarSection.querySelector("tbody").appendChild(row);
    // }

  }
}

// <input is="mt-date-picker" name="event-date" type="datetime-local" placeholder="Seleziona una data" aria-label="Seleziona la data dell'evento" />

//   <label>
//     Seleziona la data dell'evento
//     <span input-wrapper>
//       <input is="mt-date-picker" name="event-date" type="datetime-local" placeholder="Seleziona una data" />
//       <i>Cal</i>
//     </span>
//     <section>
//       Calendario con selezione date
//     </section>
//   </label>

// <input is="mt-date-picker" variant="inline" name="event-date" type="datetime-local" placeholder="Seleziona una data" aria-label="Seleziona la data dell'evento" />
