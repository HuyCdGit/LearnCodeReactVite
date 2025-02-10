import "./components/todo/todo.css";
import TodoData from "./components/todo/tododata";
import TodoNew from "./components/todo/todonew";
import ReactLogo from "./assets/react.svg";
function App() {
  const example = "example";
  const age = 25;
  const data = {
    address: "HCM",
    country: "VN",
  };
  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <TodoNew />
      <ul>
        <TodoData name={example} age={age} data={data} />
      </ul>
      <div className="todo-image">
        <img src={ReactLogo} className="todo-image" className="logo" />
      </div>
    </div>
  );
}

export default App;
