import React, { useState, useContext } from "react";

import { TodosContext } from "../context/TodosContext";

function TodoForm() {
    const { todos, setTodos } = useContext(TodosContext);
    const [todoInput, setTodoInput] = useState("");

    const getTodoInput = (event) => setTodoInput(event.target.value);

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

    return (
        <form action="#" onSubmit={addTodo}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                value={todoInput}
                onChange={getTodoInput}
            />
        </form>
    );
}

export default TodoForm;
