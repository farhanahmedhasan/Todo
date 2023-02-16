import React, { useContext, useMemo } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoItemsRemaining() {
    const { todos } = useContext(TodosContext);

    const remainingItemsCalculation = () => {
        // console.log("Calculating Remaining todos. I am slowish");
        // for (let index = 0; index < 2000000000; index++) {}
        return todos.filter((todo) => !todo.isComplete).length;
    };

    const remainingItems = useMemo(remainingItemsCalculation, [todos]);

    return <span>{remainingItems} items remaining</span>;
}

export default TodoItemsRemaining;
