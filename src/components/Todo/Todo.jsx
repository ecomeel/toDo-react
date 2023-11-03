export default function Todo({
    todo,
    onDeleteBtnClick
}) {
    return (
        <div>
            <p>{todo.title}</p>
            <button onClick={onDeleteBtnClick}>Delete todo</button>
        </div>
    )
}