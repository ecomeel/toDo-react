import React from "react";
import { useState, useEffect } from "react";
import { getTodos } from "./api/todo";
import { getNormalizedTodos } from "./utils/get-normalized-todos";

// const mockTodos = [
//   {
//     id: 1,
//     title: 'delectes sd asd',
//     completed: false
//   },
//   {
//     id: 2,
//     title: 'ssfd wqr asdas',
//     completed: false
//   }
// ]

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
              const [ids, byIds] = getNormalizedTodos(todos)

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

    return (
        <div>
            <h1>Список задач</h1>
            {isTodosLoading && <p>Todos Loading</p>}
            {isError && <p>Error has occured</p>}
            {todosIds &&
                todosIds.map((id) => <p key={id}>{todosById[id].title}</p>)}
        </div>
    );
}

export default App;
