function TodoBox(props) {
    const { todo } = props;
    return (
        <div className="todo-box">
            <h2>{todo.title}</h2>
            <p>{todo.body}</p>
            <div className="button-container">
                <button className="button-delete" onClick={() => props.handleDelete(todo.id)}>삭제하기</button>
                <button className="button-done" onClick={() => props.handleDone(todo.id)}>{(todo.isDone) ? "취소" : "완료"}</button>
            </div>

        </div>
    );
}

export default TodoBox;