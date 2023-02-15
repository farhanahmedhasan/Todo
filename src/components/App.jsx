import { useState, useRef, useEffect, useMemo } from "react";

import "../App.css";
import "../reset.css";

import TodoForm from "./TodoForm";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";

function App() {
    const [name, setName] = useState("");
    const nameInputEl = useRef(null);

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

    function changeName(event) {
        event.preventDefault();
        setName(event.target.value);
    }

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

    useEffect(() => {
        nameInputEl.current.focus();
    }, []);

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <div className="name-container">
                    <h2>What is your name ?</h2>

                    <form action="#">
                        <input
                            type="text"
                            className="todo-input"
                            placeholder="what is your name ?"
                            ref={nameInputEl}
                            value={name}
                            onChange={changeName}
                        />
                    </form>

                    {name && <p className="name-label">Hello {name}</p>}
                </div>

                <h2>Todo App</h2>

                <TodoForm addTodo={addTodo} />

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
    );
}

export default App;
