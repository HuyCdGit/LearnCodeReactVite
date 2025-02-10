import "./components/todo/todo.css";
import TodoData from "./components/todo/tododata";
import TodoNew from "./components/todo/todonew";
import ReactLogo from "./assets/react.svg";
function App() {
  const name = "example";
  const age = 25;
  const data = {
    address: "HCM",
    country: "VN",
  };
  const addNewTodo = (name) => {
    alert(`call me ${name}`);
  };
  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <TodoNew addNewTodo={addNewTodo} />
      <ul>
        <TodoData name={name} age={age} data={data} />
      </ul>
      <div className="todo-image">
        <img src={ReactLogo} className="todo-image" className="logo" />
      </div>
    </div>
  );
}

export default App;
