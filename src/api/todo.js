const BASE_URL = "https://jsonplaceholder.typicode.com";

export function getTodos() {
    return fetch(`${BASE_URL}/todos`).then((response) => {
        if (!response.ok) {
            throw new Error("Api response fail");
        }

        return response.json();
    });
}

export function deleteTodo(id) {
    fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
}

export function updateTodo(todo) {
    fetch(`${BASE_URL}/todos/${todo.id}`, { 
        method: "DELETE",
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
}

export function addTodo(todo) {
    return fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error("Api response fail");
        }

        return response.json();
    });
}