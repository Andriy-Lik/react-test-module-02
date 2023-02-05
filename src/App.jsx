import React, { Component } from 'react';
import shortid from 'shortid';

import initialTodos from './components/Data/todos.json';
import colorPickerOptions from './components/Data/ColorPicker.json';

import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import Form from './components/Form';
import Container from './components/Container';
import TodoEditor from './components/TodoEditor';
import Filter from 'components/Filter';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: ''
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

  toggleCompleted = todoId => {
    // console.log(todoId);
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo ),
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  MakeTodoClassName = (todoCompleted) => {
    // console.log(todoCompleted)
    const todoClasses = ['TodoList__item'];
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => {
        if (todo.completed === todoCompleted) {
              todoClasses.push('TodoList__item--completed');
        }
        return todoClasses.join(' ');
      })
    }))
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  getCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const completedTodosCount = this.getCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

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
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList 
          todos={visibleTodos} 
          onDeleteTodo={this.deleteTodo} 
          onToggleCompleted={this.toggleCompleted}
          onMakeTodoClassName={this.MakeTodoClassName} 
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
