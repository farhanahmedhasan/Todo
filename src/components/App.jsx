import { useMemo } from "react";

import "../App.css";
import "../reset.css";

import TodoForm from "./TodoForm";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";

import useLocalStorage from "../hooks/useLocalStorage";

import { TodosContext } from "../context/TodosContext";
import TodoUserName from "./TodoUserName";

function App() {
    const [todos, setTodos] = useLocalStorage("todos", [
        {
            id: 1,
            title: "Just an example Todo Delete me ?",
            isComplete: false,
            isEditing: false,
        },
    ]);

    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            <div className="todo-app-container">
                <div className="todo-app">
                    <TodoUserName />

                    <h2>Todo App</h2>

                    <TodoForm />

                    {todos.length > 0 && (
                        <TodoList />
                    )}

                    {todos.length < 1 && <NoTodos />}
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;
