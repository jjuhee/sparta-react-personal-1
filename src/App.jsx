import { useState } from "react";
import './App.css'

function TodoBox(props) {
  const { todo } = props;
  return (
    <div className="todo-box">
      <h2>{todo.title}</h2>
      <p>{todo.body}</p>
      <div className="button-container">
        <button onClick={() => props.handleDelete(todo.id)}>삭제하기</button>
        <button onClick={() => props.handleDone(todo.id)}>{(todo.isDone) ? "취소" : "완료"}</button>
      </div>

    </div>
  );
}

function App() {
  const initState =
    [{ id: 0, title: "리액트공부", body: "리액트를 공부합시다.", isDone: false },
    { id: 1, title: "숙제하기", body: "숙제를 합시다.", isDone: true }];

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [todoList, setTodoList] = useState(initState);

  const handleSubmit = () => {
    if (title === "" || contents === "") {
      return;
    }

    //곂침방지 todoList의 마지막 원소의 id +1
    const newTodo = {
      id: todoList[todoList.length - 1].id + 1,
      title: title,
      body: contents,
      isDone: false
    };
    console.log(newTodo);
    setTodoList([...todoList, newTodo]);
    setTitle("");
    setContents("");
  };

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  const handleDone = (id) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        if (item.isDone) {
          item.isDone = false;
        } else {
          item.isDone = true;
        }
      }
      return item;
    });
    setTodoList(newTodoList);
  }

  return (
    <div className="layout">
      <h1>My ToDo List</h1>
      <div className="input-container">
        <div>
          <span> 제목 </span>
          <input tpye='text' value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <span> 내용 </span>
          <input tpye='text' value={contents}
            onChange={(e) => setContents(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>추가하기</button>
      </div>
      <div>
        <h1>Working..</h1>
        <div className="todoBox-container">
          {todoList.filter((item) => !item.isDone)
            .map((item) => {
              return <TodoBox todo={item} key={item.id} handleDelete={handleDelete} handleDone={handleDone} />;
            })}
        </div>

        <h1>Done..</h1>
        <div className="todoBox-container">
          {todoList.filter((item) => item.isDone)
            .map((item) => {
              return <TodoBox todo={item} key={item.id} handleDelete={handleDelete} handleDone={handleDone} />;
            })}
        </div>
      </div>
    </div>);

}

export default App;