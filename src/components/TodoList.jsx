import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";

import useToggle from "../hooks/useToggle";
import { useTodosStore } from "../stores/TodoStore";

function TodoList() {
    const todos = useTodosStore((state) => state.todos);
    const deleteTodo = useTodosStore((state) => state.deleteTodo);
    const updateTodo = useTodosStore((state) => state.updateTodo);
    const markAsEditing = useTodosStore((state) => state.markAsEditing);
    const checkTodo = useTodosStore((state) => state.checkTodo);

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

    function handleKeyPress(event, id) {
        if (event.key === "Enter") {
            updateTodo(event, id);
        }

        if (event.key === "Escape") {
            markAsEditing(id);
        }
    }

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
