import { CSSTransition, SwitchTransition } from "react-transition-group";

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

                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={todos.length > 0}
                            timeout={300}
                            classNames="slide-vertical"
                            unmountOnExit
                        >
                            {todos.length > 0 ? <TodoList /> : <NoTodos />}
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;
