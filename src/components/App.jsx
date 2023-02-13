import { useState } from "react";

import "../App.css";
import "../reset.css";

import TodoForm from "./TodoForm";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Finish React Series",
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: "Go to Grocery",
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: "Do other thing",
            isComplete: false,
            isEditing: false,
        },
    ]);

    function addTodo(todoInput) {
        setTodos([
            ...todos,
            {
                id: Date.now(),
                title: todoInput,
                isComplete: false,
                isEditing: false,
            },
        ]);
    }

    const remainingItems = () => todos.filter((todo) => !todo.isComplete).length;

    const clearCompleted = () => setTodos([...todos].filter((todo) => !todo.isComplete));

    const completeAllTodos = () => {
        if (todos.length < 1) return;

        const completeAllTodos = todos.map((todo) => {
            todo.isComplete = true;
            return todo;
        });

        setTodos(completeAllTodos);
    };

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>

                <TodoForm addTodo={addTodo} />

                {todos.length > 0 && (
                    <TodoList
                        todos={todos}
                        setTodos={setTodos}
                        remainingItems={remainingItems}
                        clearCompleted={clearCompleted}
                        completeAllTodos={completeAllTodos}
                    />
                )}

                {todos.length < 1 && <NoTodos />}
            </div>
        </div>
    );
}

export default App;
