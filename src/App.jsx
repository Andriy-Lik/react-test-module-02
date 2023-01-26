import React, { Component } from 'react';

import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import Form from './components/Form';
import Container from './components/Container';

import initialTodos from './components/Data/todos.json';
import colorPickerOptions from './components/Data/ColorPicker.json';



class App extends Component {
  state = {
    todos: initialTodos
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  render() {
    const { todos } = this.state;
    const totalTodoCount = todos.length;
    const completedTodosCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );

    return (
      <Container>
        <Form onSubmit={this.formSubmitHandler} />

        <h1>Состояние компонента</h1>

        <Counter />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} />

        <div style={{marginLeft: "40px"}}>
          <p>Общее кол-во: {totalTodoCount}</p>
          <p className='titleTodoList'>Кол-во выполненных: {completedTodosCount}</p>
        </div>
        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
      </Container>
    );
  }
}

export default App;

// export const App = () => {
//   return (
//     <>
//       <h1>Состояние компонента</h1>
//       <Counter />
//       <Dropdown />
//       <ColorPicker options={colorPickerOptions} />
//       <TodoList />
//     </>
//   );
// };
