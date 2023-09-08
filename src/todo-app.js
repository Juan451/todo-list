/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import './components/todo-item.js';
import './components/todo-list.js';
import './components/todo-add.js';

class TodoApp extends LitElement {
  static properties = {
    todos: { type: Array },
  }

  constructor() {
    super();
    this.todos = [
      {
        name: 'tarea1',
        completed: false,
        id: 0
      },
      {
        name: 'zapatos al zapatero',
        completed: true,
        id: 1
      },
      {
        name: 'Algo diferente',
        completed: false,
        id: 2
      }
    ];
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 15px;
      }
    `;
  }

  render() {
    return html`
        <h1>Todo App</h1>

        <todo-add @task-added="${this.createTask}"></todo-add>
        <todo-list 
          id="listado"
          .tasks="${this.todos}"
          @task-changed="${this.taskChanged}"
        ></todo-list>
    `;
  }


  createTask(e) {
  this.todos = [
      ...this.todos,
      {
        name: e.detail,
        completed: false,
        id: this.todos.length
      }
    ]
  }

  taskChanged(e) {
    console.log('taskChanged', e.detail);
    this.todos = this.todos.map(item => {
      if(item.id === e.detail.task.id) {
        return {
          ...item,
          completed: e.detail.state
        }
      } 
        return item;
    })
  }


}

customElements.define('todo-app', TodoApp);