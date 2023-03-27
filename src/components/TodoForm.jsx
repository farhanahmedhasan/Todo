import React, { useState } from "react";

import { useTodosStore } from "../stores/TodoStore";

function TodoForm() {
    const addTodo = useTodosStore((state) => state.addTodo);

    const [todoInput, setTodoInput] = useState("");

    const getTodoInput = (event) => setTodoInput(event.target.value);

    function handleSubmit(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) return;

        addTodo(todoInput);

        setTodoInput("");
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
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
