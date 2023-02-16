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

    const remainingItemsCalculation = () => {
        // console.log("Calculating Remaining todos. I am slowish");
        // for (let index = 0; index < 2000000000; index++) {}
        return todos.filter((todo) => !todo.isComplete).length;
    };

    const remainingItems = useMemo(remainingItemsCalculation, [todos]);

    const clearCompleted = () => setTodos([...todos].filter((todo) => !todo.isComplete));

    const completeAllTodos = () => {
        if (todos.length < 1) return;

        const completeAllTodos = todos.map((todo) => {
            todo.isComplete = true;
            return todo;
        });

        setTodos(completeAllTodos);
    };

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

    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            <div className="todo-app-container">
                <div className="todo-app">
                    <TodoUserName />

                    <h2>Todo App</h2>

                    <TodoForm />

                    {todos.length > 0 && (
                        <TodoList
                            todos={todos}
                            setTodos={setTodos}
                            remainingItems={remainingItems}
                            clearCompleted={clearCompleted}
                            completeAllTodos={completeAllTodos}
                            filteredTodos={filteredTodos}
                        />
                    )}

                    {todos.length < 1 && <NoTodos />}
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;
