import { useTodosStore } from "../stores/TodoStore";

function TodoClearCompleted() {
    const clearCompleted = useTodosStore((state) => state.clearCompleted);

    return (
        <button onClick={clearCompleted} className="button">
            Clear completed
        </button>
    );
}

export default TodoClearCompleted;
