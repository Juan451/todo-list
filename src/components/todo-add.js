/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, html } from 'lit-element';
import '@dile/dile-input/dile-input.js';

export class TodoAdd extends LitElement {

    static get properties() {
        return {
            value: { type: String },
        };
    }

    constructor() {
        super();
        this.value = '';
    }

    render() {
        return html`
        <dile-input
            label="Nueva tarea"
            value="${this.value}"
            placeholder="Escribe la tarea y pulsa enter"
            @enter-pressed="${this.createTask}"
            @input="${(e) => this.value = e.target.value}"
        >
        </dile-input>
        `;
    }

    createTask(e) {
        this.dispatchEvent(new CustomEvent('task-added', {
            bubbles: true,
            composed: true,
            detail: e.target.value
        }));
        this.value = '';
    }
}
customElements.define('todo-add', TodoAdd);
