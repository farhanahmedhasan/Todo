import { CSSTransition, SwitchTransition } from "react-transition-group";

import "../App.css";
import "../reset.css";

import TodoForm from "./TodoForm";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";

import TodoUserName from "./TodoUserName";
import { useTodosStore } from "../stores/TodoStore";

function App() {
    const todos = useTodosStore((state) => state.todos);

    return (
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
    );
}

export default App;
