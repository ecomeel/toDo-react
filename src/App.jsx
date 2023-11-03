import React from 'react'
import { useState, useEffect } from 'react';

const mockTodos = [
  {
    id: 1,
    title: 'delectes sd asd',
    completed: false
  },
  {
    id: 2,
    title: 'ssfd wqr asdas',
    completed: false
  }
]

function App() {
  const [todos, setTodos] = useState(null);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true)
    setTodos(mockTodos)
    setIsTodosLoading(false)
  }, []);

  console.log(todos)

  return (
    <div>
      <h1>Список задач</h1>
      { isTodosLoading && <p>Todos Loading</p> }
      { isError && <p>Error has occured</p> }
      { todos && todos.map(todo => (
        <p key={todo.id}>{todo.title}</p>
      )) }
    </div>
  )
}

export default App
