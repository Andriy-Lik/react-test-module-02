import React from "react";
import './TodoList.css';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted, makeTodoClassName }) => (



    <ul className="TodoList">
        {todos.map(({ id, text, completed }) => (
            <li 
                key={id} 
                className="TodoList__item"
                // className={() => makeTodoClassName(id)}
            >
                <input 
                    type="checkbox"
                    className="TodoList__checkbox"
                    checked={completed}
                    onChange={() => onToggleCompleted(id)}
                />
                <p className="TodoList__text">{text}</p>
                <button onClick={() => onDeleteTodo(id)}>Удалить</button>
            </li>
        ))}
    </ul>
)

export default TodoList;