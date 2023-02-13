import React from "react";
import PropTypes from "prop-types";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";

function TodoList({ todos, setTodos, remainingItems, clearCompleted }) {
    const checkTodo = (id) => {
        const checkedTodos = todos.map((todo) => {
            if (todo.id === id) todo.isComplete = !todo.isComplete;
            return todo;
        });

        setTodos(checkedTodos);
    };

    const markAsEditing = (id) => {
        const eiditingTodos = todos.map((todo) => {
            if (todo.id === id) todo.isEditing = !todo.isEditing;
            return todo;
        });

        setTodos(eiditingTodos);
    };

    function updateTodo(event, id) {
        const updatedTodos = todos.map((todo) => {
            if (event.target.value.trim().length === 0) {
                todo.isEditing = false;
                return todo;
            }

            if (todo.id === id) {
                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    function handleKeyPress(event, id) {
        if (event.key === "Enter") {
            updateTodo(event, id);
        }

        if (event.key === "Escape") {
            markAsEditing(id);
        }
    }

    const deleteTodo = (id) => setTodos([...todos].filter((todo) => todo.id != id));

    return (
        <>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item-container">
                        <div className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.isComplete}
                                onChange={() => checkTodo(todo.id)}
                            />

                            {!todo.isEditing ? (
                                <span
                                    onDoubleClick={() => markAsEditing(todo.id)}
                                    className={`todo-item-label ${
                                        todo.isComplete ? "line-through" : ""
                                    }`}
                                >
                                    {todo.title}
                                </span>
                            ) : (
                                <input
                                    type="text"
                                    className="todo-item-input"
                                    autoFocus
                                    defaultValue={todo.title}
                                    onBlur={(event) => updateTodo(event, todo.id)}
                                    onKeyDown={(event) => handleKeyPress(event, todo.id)}
                                />
                            )}
                        </div>
                        <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                            <svg
                                className="x-button-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="check-all-container">
                <div>
                    <div className="button">Check All</div>
                </div>

                <TodoItemsRemaining remainingItems={remainingItems} />
            </div>

            <div className="other-buttons-container">
                <div>
                    <button className="button filter-button filter-button-active">All</button>
                    <button className="button filter-button">Active</button>
                    <button className="button filter-button">Completed</button>
                </div>
                <div>
                    <TodoClearCompleted clearCompleted={clearCompleted} />
                </div>
            </div>
        </>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func.isRequired,
    remainingItems: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
};

export default TodoList;
