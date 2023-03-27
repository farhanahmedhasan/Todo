import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodosStore = create(
    persist(
        (set) => ({
            todos: [
                {
                    id: 1,
                    title: "Just an example Todo Delete me ?",
                    isComplete: false,
                    isEditing: false,
                },
            ],
            addTodo: (todoTitle) =>
                set((state) => ({
                    todos: [
                        ...state.todos,
                        {
                            id: Date.now(),
                            title: todoTitle,
                            isComplete: false,
                            isEditing: false,
                        },
                    ],
                })),

            deleteTodo: (id) =>
                set((state) => ({
                    todos: [...state.todos].filter((todo) => todo.id != id),
                })),

            markAsEditing: (id) =>
                set((state) => ({
                    todos: state.todos.map((todo) => {
                        if (todo.id === id) todo.isEditing = !todo.isEditing;
                        return todo;
                    }),
                })),

            updateTodo: (event, id) =>
                set((state) => ({
                    todos: state.todos.map((todo) => {
                        if (event.target.value.trim().length === 0) {
                            todo.isEditing = false;
                            return todo;
                        }

                        if (todo.id === id) {
                            todo.title = event.target.value;
                            todo.isEditing = false;
                        }

                        return todo;
                    }),
                })),

            checkTodo: (id) =>
                set((state) => ({
                    todos: state.todos.map((todo) => {
                        if (todo.id === id) todo.isComplete = !todo.isComplete;
                        return todo;
                    }),
                })),

            completeAllTodos: () =>
                set((state) => ({
                    todos: state.todos.map((todo) => {
                        todo.isComplete = true;
                        return todo;
                    }),
                })),

            clearCompleted: () =>
                set((state) => ({
                    todos: [...state.todos].filter((todo) => !todo.isComplete),
                })),
        }),

        {
            name: "todos",
        }
    )
);
