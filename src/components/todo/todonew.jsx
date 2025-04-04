import { useState } from "react";

const TodoNew = (props) => {
  //useState Hook (getter/setter)
  //Array Destructuring
  const [valueInput, setValueInput] = useState("");
  const { addNewTodo } = props;
  //   addNewTodo("example");
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };
  //cách 1
  //   const handleOnChange = (event) => {
  //     console.log("handle onchange", event.target.value);
  //   };
  //cách 2
  const handleOnChange = (name) => {
    console.log("handle onchange", name);
    setValueInput(name);
  };
  return (
    <div className="NewTodoForm" /*onSubmit={handleOnSubmit}*/>
      <label htmlFor="task">New todo</label>
      <input
        // value={userInput.task}
        //cách 1
        // onChange={handleOnChange}
        //cách 2
        onChange={(event) => {
          handleOnChange(event.target.value);
        }}
        value={valueInput}
        type="text"
        placeholder="New Todo"
      />

      <button onClick={handleClick}>Add Todo</button>
    </div>
  );
};

export default TodoNew;
