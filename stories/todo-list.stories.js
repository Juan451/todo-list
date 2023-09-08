import { html } from 'lit';
import '../src/todo-list.js';

export default {
  title: 'TodoList',
  component: 'todo-list',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <todo-list
      style="--todo-list-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </todo-list>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
