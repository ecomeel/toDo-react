import React from "react";
import { useState, useEffect } from "react";
import { getTodos, deleteTodo, updateTodo, addTodo } from "./api/todo";
import { getNormalizedTodos } from "./utils/get-normalized-todos";
import Todo from "./components/Todo/Todo";

function App() {
    const [todosIds, setTodosIds] = useState(null);
    const [todosById, setTodosById] = useState({});
    const [isTodosLoading, setIsTodosLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [todoTitle, setTodoTitle] = useState("");

    useEffect(() => {
        setIsError(false);
        setIsTodosLoading(true);

        getTodos()
            .then((todos) => {
                const [ids, byIds] = getNormalizedTodos(todos);

                setIsTodosLoading(false);
                setTodosIds(ids);
                setTodosById(byIds);
            })
            .catch((error) => {
                setIsError(true);
                setIsTodosLoading(false);
            });

        setIsTodosLoading(false);
    }, []);

    function handleDeleteTodo(id) {
        setTodosIds(todosIds.filter((todoId) => todoId !== id));
        deleteTodo(id);
    }

    function handleToggleTodo(id) {
        const todo = {
            ...todosById[id],
            completed: !todosById[id].completed,
        };
        setTodosById({
            ...todosById,
            [id]: todo,
        });
        updateTodo(todo);
    }

    function handleInputTodoTitleChange(event) {
        setTodoTitle(event.target.value)
    }

    function handleAddTodoBtnClick() {
        const newTodo = {
            title: todoTitle,
            completed: false
        }

        addTodo(newTodo)
            .then(todo => {
                setTodosById({
                    ...todosById,
                    [todo.id]: todo
                });
                setTodosIds([todo.id, ...todosIds])
            })
            .catch(() => {})
    }

    return (
        <div>
            <h1>Список задач</h1>
            {isTodosLoading && <p>Todos Loading</p>}
            {isError && <p>Error has occured</p>}
            <input
                type="text"
                value={todoTitle}
                onChange={(event) => handleInputTodoTitleChange(event)}
            />
            <button onClick={handleAddTodoBtnClick}>Add todo</button>
            {todosIds &&
                todosIds.map((id) => (
                    <Todo
                        key={id}
                        todo={todosById[id]}
                        onToggle={() => handleToggleTodo(id)}
                        onDelete={() => handleDeleteTodo(id)}
                    />
                ))}
        </div>
    );
}

export default App;
