export default function Todo({
    todo,
    onDelete,
    onToggle
}) {
    return (
        <div>
            <p>{todo.title}</p>
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle} />
            <button onClick={onDelete}>Delete todo</button>
        </div>
    )
}