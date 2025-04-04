import TodoData from "./tododata";
import TodoNew from "./todonew";
import "./todo.css";
import ReactLogo from "../../assets/react.svg";
import { useState } from "react";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  // { id: 1, name: "Learning React" },
  // { id: 2, name: "Watching React" },
  const name = "example";
  const age = 25;
  const data = {
    address: "HCM",
    country: "VN",
  };
  const addNewTodo = (name) => {
    const newTodo = {
      id: ramdomIntFromInterval(1, 1000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };
  const ramdomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const deletetodo = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id);
    setTodoList(newTodo);
  };
  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <TodoNew addNewTodo={addNewTodo} />
      {todoList.length > 0 ? (
        <ul>
          <TodoData
            name={name}
            age={age}
            data={data}
            todoList={todoList}
            deletetodo={deletetodo}
          />
        </ul>
      ) : (
        <div className="todo-image">
          <img src={ReactLogo} className="todo-image, logo" />
        </div>
      )}
    </div>
  );
};

export default TodoApp;
