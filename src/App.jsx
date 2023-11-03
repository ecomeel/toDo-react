import React from "react";
import { useState, useEffect } from "react";
import { getTodos, deleteTodo } from "./api/todo";
import { getNormalizedTodos } from "./utils/get-normalized-todos";
import Todo from "./components/Todo/Todo";

function App() {
    const [todosIds, setTodosIds] = useState(null);
    const [todosById, setTodosById] = useState({});
    const [isTodosLoading, setIsTodosLoading] = useState(false);
    const [isError, setIsError] = useState(false);

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
        setTodosById({
            ...todosById,
            [id]: {
                ...todosById[id],
                completed: !todosById[id].completed
            }
        })
    }

    return (
        <div>
            <h1>Список задач</h1>
            {isTodosLoading && <p>Todos Loading</p>}
            {isError && <p>Error has occured</p>}
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
