import './todo.css';

export default function Todo({
    todo,
    onDelete,
    onToggle
}) {
    return (
        <div className='todo'>
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle} />
            <p>{todo.title}</p>
            <button onClick={onDelete}>Delete todo</button>
        </div>
    )
}