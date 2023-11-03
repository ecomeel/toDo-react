const BASE_URL = "https://jsonplaceholder.typicode.com"

export function getTodos() {
    return fetch(`${BASE_URL}/todos`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Api response fail");
            }

            return response.json();
        })
}
