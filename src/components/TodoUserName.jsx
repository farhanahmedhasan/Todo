import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import useLocalStorage from "../hooks/useLocalStorage";

function TodoUserName() {
    const [name, setName] = useLocalStorage("name", "");
    const nameInputEl = useRef(null);

    const handleNameInput = (event) => setName(event.target.value);

    useEffect(() => {
        nameInputEl.current.focus();
    }, []);

    return (
        <div className="name-container">
            <h2>What is your name ?</h2>

            <form action="#">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="what is your name ?"
                    ref={nameInputEl}
                    value={name}
                    onChange={handleNameInput}
                />
            </form>

            <CSSTransition
                in={name.length > 0}
                timeout={300}
                classNames="slide-horizontal"
                unmountOnExit
            >
                <p className="name-label">
                    Hello <span>{name}</span>
                </p>
            </CSSTransition>
        </div>
    );
}

export default TodoUserName;
