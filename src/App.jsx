import React, { Component } from 'react';

import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import Form from './components/Form';
import Container from './components/Container';
import TodoEditor from './components/TodoEditor';

import initialTodos from './components/Data/todos.json';
import colorPickerOptions from './components/Data/ColorPicker.json';
import shortid from 'shortid';

class App extends Component {
  state = {
    todos: initialTodos
  };

  addTodo = text => {
    
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    }

    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    console.log(todoId);
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  onMakeTodoClassName = todoId => {
    const todoClasses = ['TodoList__item'];
    this.setState(prevState => ({
        todos: prevState.todos.map(todo => {
            if (todo.id === todoId) {
                todoClasses.push('TodoList__item--completed');
            }
            return todoClasses.join(' ');
        })
    }))
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
        <TodoEditor onSubmit={this.addTodo} />
        <TodoList 
          todos={todos} 
          onDeleteTodo={this.deleteTodo} 
          onToggleCompleted={this.toggleCompleted}
          makeTodoClassName={this.onMakeTodoClassName} 
        />
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
