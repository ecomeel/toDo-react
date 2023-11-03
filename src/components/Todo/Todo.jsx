export default function Todo({
    todo
}) {
    return (
        <div key={todo.id}>
            <p>{todo.title}</p>
        </div>
    )
}