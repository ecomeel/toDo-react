import React from "react";
import { useState, useEffect } from "react";
import { getTodos } from "./api/todo";
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

    function handleDeleteTodoBtnClick(id) {
        console.log(id)
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
                        onDeleteBtnClick={() => handleDeleteTodoBtnClick(id)}
                    />
                ))}
        </div>
    );
}

export default App;
