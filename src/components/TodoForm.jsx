import React, { useState } from "react";
import PropTypes from "prop-types";

function TodoForm({ addTodo }) {
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

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
