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
  #currentMonthSelect;
  #currentYearInput;
  #calendarSection;
  #prevMonthButton;
  #nextMonthButton;
  #value;
  //#currentMonth;
  //#currentYear;

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get variant() {
    return this.getAttribute("variant");
  }

  set variant(value) {
    this.setAttribute("variant", value);
  }

  onCurrentMonthChange(e) {
    this.renderCalendar();
  }

  onCurrentYearChange(e) {
    this.renderCalendar();
  }

  goToPrevMonth(e){
    let currentMonth = this.#currentMonthSelect.value;
    let currentYear = this.#currentYearInput.value;

    if(currentMonth === '01'){
      currentMonth = '12';
      currentYear = (parseInt(currentYear) - 1).toString();
    } else {
      currentMonth = (parseInt(currentMonth) - 1).toString().padStart(2, '0');
    }
    this.#currentMonthSelect.value = currentMonth;
    this.#currentYearInput.value = currentYear;
    this.renderCalendar();
  }

  goToNextMonth(e){
    let currentMonth = this.#currentMonthSelect.value;
    let currentYear = this.#currentYearInput.value;

    if(currentMonth === '12'){
      currentMonth = '01';
      currentYear = (parseInt(currentYear) + 1).toString();
    } else {
      currentMonth = (parseInt(currentMonth) + 1).toString().padStart(2, '0');
    }
    this.#currentMonthSelect.value = currentMonth;
    this.#currentYearInput.value = currentYear;
    this.renderCalendar();
  }

  onConnected() {
    this.#currentMonthSelect.addEventListener("change", this.onCurrentMonthChange.bind(this));
    this.#currentYearInput.addEventListener("input", this.onCurrentYearChange.bind(this));

    this.#prevMonthButton.addEventListener("click", this.goToPrevMonth.bind(this));
    this.#nextMonthButton.addEventListener("click", this.goToNextMonth.bind(this));
  }

  onDisconnected() {
    this.#currentMonthSelect.removeEventListener("change", this.onCurrentMonthChange);
    this.#currentYearInput.removeEventListener("input", this.onCurrentYearChange);

    this.#prevMonthButton.removeEventListener("click", this.goToPrevMonth);
    this.#nextMonthButton.removeEventListener("click", this.goToNextMonth);
  }

  constructor() {
    super();

    this.#value = new Date(this.getAttribute("value") ?? new Date());

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
    this.renderCalendarHeader();
    this.renderCalendar();

    // Append this (input) into wrapper span
    // this.#inputWrapper.prepend(this);
    // Alternativa ma per coerenza usiamo insert adijacentElement
    this.#inputWrapper.insertAdjacentElement("afterbegin", this);

    if (this.variant === "inline") {
      this.#inputWrapper.setAttribute("sr-only", "");
      this.type = "hidden";
    } else {
      this.type = "datetime-local";
    }
  }

  renderCalendarHeader(){
    //this.#currentMonth = this.#value.getMonth() + 1;
    //this.#currentYear = this.#value.getFullYear();
    this.#currentMonthSelect = this.#calendarSection.querySelector("select");
    this.#currentMonthSelect.value = (this.#value.getMonth() + 1).toString().padStart(2, "0");
    this.#currentYearInput = this.#calendarSection.querySelector("input");
    this.#currentYearInput.value = this.#value.getFullYear().toString();

    this.#prevMonthButton = document.createElement("button");
    this.#prevMonthButton.innerHTML = '&lt;';

    this.#currentMonthSelect.before(this.#prevMonthButton);
    
    this.#nextMonthButton = document.createElement("button");
    this.#nextMonthButton.innerHTML = '&gt;';

    this.#currentYearInput.after(this.#nextMonthButton);
  }

  renderCalendar(month = this.#currentMonthSelect.value, year = this.#currentYearInput.value) {
    console.log(month);
    this.#calendarSection.querySelector("tbody").innerHTML = "";
    const firstDate = new Date(`${year}-${month.toString().padStart(2, "0")}-01T00:00:00`);
    //const firstDateOfNextMonth = new Date(`${year}-${((month + 1)%12).toString().padStart(2, "0")}-01T00:00:00`);
    const firstDayOfWeek = firstDate.getDay();
    let lastDate = new Date(firstDate);
    lastDate.setMonth(lastDate.getMonth() + 1);
    console.log({ lastDate });
    lastDate = lastDate.addDays(-1);
    const lastDayOfWeek = lastDate.getDay();
    const firstShownDate = firstDate.addDays(-((firstDayOfWeek + 6) % 7));
    //const lastShownDate = lastDate.addDays(7 - lastDayOfWeek);
    const daysInMonth = lastDate.getDate();

    console.log({
      firstDate,
      firstDayOfWeek,
      daysInMonth,
      lastDate,
      lastDayOfWeek,
      firstShownDate,
    });

    let iteratorDate = new Date(firstShownDate);
    const renderDates = [];

    while (renderDates.length < 42) {
      renderDates.push(new Date(iteratorDate));
      iteratorDate = iteratorDate.addDays(1);
    }
    const chunk = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size),
      );
    const calendarChunks = chunk(renderDates, 7);
    const calendarItems = calendarChunks.map((week) => {
      const row = document.createElement("tr");
      row.append(
        ...week.map((date) => {
          const isInMonth = firstDate <= date && date <= lastDate;
          const cell = document.createElement("td");
          cell.innerHTML = `<button ${isInMonth ? 'in-month' : ''}>${date.getDate()}</button>`;
          return cell;
        }),
      );
      return row;
    });
    this.#calendarSection.querySelector("tbody").append(...calendarItems);

    //let date = 1;
    //for (let i = 0; i < 7; i++) {
    //  const row = document.createElement("tr");
    //    for (let j = 0; j < 7; j++) {
    //        if (i === 0 && j < firstDayOfWeek - 1) {
    //            const cell = document.createElement("td");
    //            cell.textContent = "";
    //            row.appendChild(cell);
    //        } else if (date > daysInMonth) {
    //            break;
    //        } else {
    //            const cell = document.createElement("td");
    //            cell.innerHTML = `<button>${date}</button>`;
    //            row.appendChild(cell);
    //            date++;
    //        }
    //    }
    //    console.log(row);
    //    this.#calendarSection.querySelector("tbody").appendChild(row);
    //}
  }
}

// <input is="mt-date-picker" name="event-date" type="datetime-local" placeholder="Seleziona una data" aria-label="Seleziona la data dell'evento" />

//   <label>
//     Seleziona la data dell'evento
//     <span input-wrapper>
//       <input is="mt-date-picker" value="2024-06-01T00:00" name="event-date" type="datetime-local" placeholder="Seleziona una data" />
//       <i>Cal</i>
//     </span>
//     <section>
//       Calendario con selezione date
//     </section>
//   </label>

// <input is="mt-date-picker" variant="inline" name="event-date" type="datetime-local" placeholder="Seleziona una data" aria-label="Seleziona la data dell'evento" />
