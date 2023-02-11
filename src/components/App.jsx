import { useState } from "react";

import "../App.css";
import "../reset.css";

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Finish React Series",
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: "Go to Grocery",
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: "Do other thing",
            isComplete: false,
            isEditing: false,
        },
    ]);

    const [todoInput, setTodoInput] = useState("");

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) return;

        setTodos([
            ...todos,
            {
                id: Date.now(),
                title: todoInput,
                isComplete: false,
                isEditing: false,
            },
        ]);

        setTodoInput("");
    }

    const deleteTodo = (id) => setTodos([...todos].filter((todo) => todo.id != id));

    const getTodoInput = (event) => setTodoInput(event.target.value);

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

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <form action="#" onSubmit={addTodo}>
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="What do you need to do?"
                        value={todoInput}
                        onChange={getTodoInput}
                    />
                </form>

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

                    <span>3 items remaining</span>
                </div>

                <div className="other-buttons-container">
                    <div>
                        <button className="button filter-button filter-button-active">All</button>
                        <button className="button filter-button">Active</button>
                        <button className="button filter-button">Completed</button>
                    </div>
                    <div>
                        <button className="button">Clear completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
