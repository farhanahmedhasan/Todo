import React, { useContext, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";

import useToggle from "../hooks/useToggle";
import { TodosContext } from "../context/TodosContext";

function TodoList() {
    const { todos, setTodos } = useContext(TodosContext);

    const [filter, setFilter] = useState("all");

    const [isFeatureOneVisible, setIsFeatureOneVisible] = useToggle();
    const [isFeatureTwoVisible, setIsFeatureTwoVisible] = useToggle();

    const filteredTodos = (filter) => {
        if (filter === "all") {
            return todos;
        }

        if (filter === "active") {
            return todos.filter((todo) => !todo.isComplete);
        }

        if (filter === "completed") {
            return todos.filter((todo) => todo.isComplete);
        }
    };

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
            <TransitionGroup className="todo-list" component="ul">
                {filteredTodos(filter).map((todo) => (
                    <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
                        <li className="todo-item-container">
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
                    </CSSTransition>
                ))}
            </TransitionGroup>

            <div className="toggles-container">
                <div onClick={setIsFeatureOneVisible} className="button">
                    Features One Toggle
                </div>
                <div onClick={setIsFeatureTwoVisible} className="button">
                    Features Two Toggle
                </div>
            </div>

            <CSSTransition
                in={isFeatureOneVisible}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
            >
                <div className="check-all-container">
                    <TodoCompleteAll />

                    <TodoItemsRemaining />
                </div>
            </CSSTransition>

            <CSSTransition
                in={isFeatureTwoVisible}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
            >
                <div className="other-buttons-container">
                    <TodoFilters filter={filter} setFilter={setFilter} />
                    <div>
                        <TodoClearCompleted />
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}

export default TodoList;
