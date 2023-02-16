import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoCompleteAll() {
    const { todos, setTodos } = useContext(TodosContext);

    const completeAllTodos = () => {
        if (todos.length < 1) return;

        const completeAllTodos = todos.map((todo) => {
            todo.isComplete = true;
            return todo;
        });

        setTodos(completeAllTodos);
    };

    return (
        <div onClick={completeAllTodos} className="button">
            Check All
        </div>
    );
}

export default TodoCompleteAll;
