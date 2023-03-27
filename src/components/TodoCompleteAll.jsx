import React from "react";
import { useTodosStore } from "../stores/TodoStore";

function TodoCompleteAll() {
    const todos = useTodosStore((state) => state.todos);
    const completeAllTodos = useTodosStore((state) => state.completeAllTodos);

    const handleCompleteAllTodos = () => {
        if (todos.length < 1) return;
        completeAllTodos();
    };

    return (
        <div onClick={handleCompleteAllTodos} className="button">
            Check All
        </div>
    );
}

export default TodoCompleteAll;
