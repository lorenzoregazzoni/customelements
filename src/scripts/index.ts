
import "./UI/index.js";
import "./app/app.ts";




// type TodoItem = {
//   id: number;
//   text: string;
//   completed: boolean;
//   createdAt: Date;
// };

// class TodoList {
//   form: HTMLFormElement;
//   input: HTMLInputElement;
//   list: HTMLUListElement;
//   emptyMessage: HTMLParagraphElement;
//   todos: TodoItem[];

//   constructor() {
//     this.initElements();
//     this.todos = (JSON.parse(localStorage.getItem("todos")) || []) as TodoItem[];

//     this.addEventListeners();
//     this.render();
//   }

//   initElements() {
//     this.form = document.querySelector<HTMLFormElement>("#todo-form");
//     this.input = document.querySelector<HTMLInputElement>("#todo-input");
//     this.list = document.querySelector<HTMLUListElement>("#todo-list");
//     this.emptyMessage = document.querySelector<HTMLParagraphElement>("#todo-empty");
//   }

//   addEventListeners() {
//     this.form.addEventListener("submit", (e) => {debugger;this.addTodo(e)});
//     this.list.addEventListener("change", (e) => {
//       const checkbox = e.target as HTMLInputElement;
//       if (checkbox.type === "checkbox") {
//         const li = checkbox.closest("li");
//         const id = parseInt(li.dataset.todoId);
//         this.toggleTodo(id);
//       }
//     });
//     this.list.addEventListener("click", (e) => {
//       const button = e.target as HTMLButtonElement;
//       if (button.classList?.contains("delete-btn")) {
//         const li = button.closest("li");
//         const id = parseInt(li.dataset.todoId);
//         this.deleteTodo(id);
//       }
//     });
//   }

//   addTodo(e: Event) {
//     e.preventDefault();
//     const text = this.input.value.trim();

//     if (!text) return;

//     const todoItem: TodoItem = {
//       id: Date.now(),
//       text: text,
//       completed: false,
//       createdAt: new Date(),
//     };
//     this.todos.push(todoItem);
//     this.saveTodos();
//     this.input.value = "";
//     this.input.focus();
//     this.appendItem(todoItem);
//     // this.render();
//   }

//   toggleTodo(id: number) {
//     const todo = this.todos.find((t) => t.id === id);
//     if (todo) {
//       todo.completed = !todo.completed;
//       this.saveTodos();

//       const label = this.list.querySelector<HTMLLabelElement>(`li[data-todo-id="${id}"] label`);
//       label.style.textDecoration = todo.completed ? "line-through" : "";
//       label.style.opacity = todo.completed ? "0.6" : "";
//       // this.render();
//     }
//   }

//   deleteTodo(id: number) {
//     this.todos = this.todos.filter((t) => t.id !== id);
//     this.saveTodos();
//     const li = this.list.querySelector(`li[data-todo-id="${id}"]`);
//     li?.remove();
//     // this.render();
//   }

//   saveTodos() {
//     localStorage.setItem("todos", JSON.stringify(this.todos));
//   }

//   render() {
//     this.list.innerHTML = "";

//     if (this.todos.length === 0) {
//       this.emptyMessage.style.display = "block";
//       this.list.style.display = "none";
//       return;
//     }

//     this.emptyMessage.style.display = "none";
//     this.list.style.display = "block";

//     this.todos.forEach((todo) => this.appendItem(todo));
//   }

//   appendItem(todo: TodoItem) {
//     const li = document.createElement("li");
//     li.dataset.todoId = todo.id.toString();
//     li.className = "todo-item";

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = `todo-${todo.id}`;
//     checkbox.checked = todo.completed;
//     checkbox.setAttribute("aria-describedby", `todo-date-${todo.id}`);
//     // checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

//     const label = document.createElement("label");
//     label.htmlFor = `todo-${todo.id}`;
//     label.textContent = todo.text;
//     if (todo.completed) {
//       label.style.textDecoration = "line-through";
//       label.style.opacity = "0.6";
//     }

//     const dateSpan = document.createElement("span");
//     dateSpan.id = `todo-date-${todo.id}`;
//     dateSpan.className = "todo-date";
//     dateSpan.textContent = `Creato: ${todo.createdAt.toLocaleString("it-IT")}`;
//     dateSpan.setAttribute("aria-label", `Creato: ${todo.createdAt.toLocaleString("it-IT")}`);

//     const deleteBtn = document.createElement("button");
//     deleteBtn.type = "button";
//     deleteBtn.className = "delete-btn";
//     deleteBtn.textContent = "Elimina";
//     deleteBtn.setAttribute("aria-label", `Elimina todo: ${todo.text}`);
//     // deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

//     li.appendChild(checkbox);
//     li.appendChild(label);
//     li.appendChild(dateSpan);
//     li.appendChild(deleteBtn);

//     this.list.appendChild(li);
//   }
// }

// // Inizializza la lista dei todo quando il DOM è pronto
// document.addEventListener("DOMContentLoaded", () => {
//   new TodoList();
// });
