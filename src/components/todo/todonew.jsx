const TodoNew = (props) => {
  console.log("check point: ", props);
  //   const { addNewTodo } = props;
  //   addNewTodo("example");
  const handleClick = () => {
    alert("click me");
  };
  //cách 1
  //   const handleOnChange = (event) => {
  //     console.log("handle onchange", event.target.value);
  //   };
  //cách 2
  const handleOnChange = (name) => {
    console.log("handle onchange", name);
  };
  return (
    <form className="NewTodoForm" /*onSubmit={handleSubmit}*/>
      <label htmlFor="task">New todo</label>
      <input
        // value={userInput.task}
        //cách 1
        // onChange={handleOnChange}
        //cách 2
        onChange={(event) => {
          handleOnChange(event.target.value);
        }}
        id="task"
        type="text"
        name="task"
        placeholder="New Todo"
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoNew;
