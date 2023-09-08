/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

class TodoList extends LitElement {

  static get styles() {
    return css`
    :host {
      display: block;
      margin: 15px 0;
      padding: 15px;
      border: 1px solid #4ae;
      border-radius: 10px;
      font-family: sans-serif;
    }
    section {
      margin-left: 10px;
    }
    article {
      flex-grow: 1;
    }
    button {
      margin-right: 15px;
    }
    div {
      border-radius: 10px;
      height: 30px;

      margin-bottom: 15px;
      display: flex;
      align-items: center;
      padding: 0 15px;
    }
    span {
      margin-right: 10px;
    }
    `;
  }

  static get properties() {
    return {
      tasks: { type: Array },
      query: { type: Array },
      order: { type: Array }
    };
  }

  constructor() {
    super();
    this.tasks = [];
    this.order = 'asc';
    this.query = '';
  }

  render() {
    return html`
      <div>
        <article>
          <button @click=${this.setFilterAsc}>Asc</button>
          <button @click="${this.setFilterDesc}">Desc</button>
        </article>
        <span>Filtro:</span> <input type="text" @input="${this.changeFilter}">
      </div>
      ${
        this.getItems(this.tasks, this.order, this.query).map( item => html`<todo-item .task=${item}></todo-item>`)
      }
    `;
  }

  getItems(tasks, order, query) {
    return this.doOrder(this.doFilter(tasks, query), order);
  }

  doFilter(tasks, query) {
    return tasks.filter(item => {
      if(!query) {
        return true;
      }
      if(item.name.indexOf(query) !== -1) {
        return true;
      }
      return false;
    })
  }

  setFilterAsc() {
    this.order = 'asc';
  }

  setFilterDesc() {
    this.order = 'desc';
  }

  doOrder(tasks, order) {
    console.log('doOrder', tasks, order);
    return tasks.sort((a, b) => {
      let nameA; let nameB;
      if(order === 'asc') {
      nameA = a.name.toLowerCase();
      nameB = b.name.toLowerCase();
      } else {
        nameA = b.name.toLowerCase();
        nameB = a.name.toLowerCase();
      }
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return - 1;
      }
      return 0;
    })
  }

  changeFilter(e) {
    this.query = e.target.value;
  }

}
customElements.define('todo-list', TodoList);