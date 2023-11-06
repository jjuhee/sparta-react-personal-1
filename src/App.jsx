import { useState } from "react";
import './App.css'
import TodoBox from "./components/TodoBox.jsx"

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
      // if (item.id === id) {
      //   if (item.isDone) {
      //     item.isDone = false; // 원본 수정 : 좋지않은 코드!
      //   } else {
      //     item.isDone = true;
      //   }
      // }
      if (item.id === id) {
        return { ...item, isDone: (item.isDone) ? false : true }; // 객체 복사 후 isDone 만 재정의
      }
      return item;
    });
    setTodoList(newTodoList);
  }

  return (
    <div className="layout">
      <h1 style={{ marginLeft: "7px" }}>My ToDo List 🧾</h1>
      <div className="input-container">
        <div className="layout-head">
          <span> 제목: </span>
          <input tpye='text' value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <span> 내용: </span>
          <input tpye='text' value={contents}
            onChange={(e) => setContents(e.target.value)} />
        </div>
        <button className="button-add" onClick={handleSubmit}>추가하기</button>
      </div>
      <div className="layout-body">
        <h1>Working..🔥</h1>
        <div className="todoBox-container">
          {todoList.filter((item) => !item.isDone)
            .map((item) => {
              return <TodoBox todo={item} key={item.id} handleDelete={handleDelete} handleDone={handleDone} />;
            })}
        </div>

        <h1>Done..🎊</h1>
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