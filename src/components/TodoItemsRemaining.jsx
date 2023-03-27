import React, { useMemo } from "react";
import { useTodosStore } from "../stores/TodoStore";

function TodoItemsRemaining() {
    const todos = useTodosStore((state) => state.todos);

    const remainingItemsCalculation = () => {
        return todos.filter((todo) => !todo.isComplete).length;
    };

    const remainingItems = useMemo(remainingItemsCalculation, [todos]);

    return <span>{remainingItems} items remaining</span>;
}

export default TodoItemsRemaining;
