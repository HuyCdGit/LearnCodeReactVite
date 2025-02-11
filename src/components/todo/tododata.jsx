const TodoData = (props) => {
  //console.log("check props:", props);
  // object destructuring
  const { todoList } = props;
  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        console.log("check map", item, index);
        return (
          <div className="todo-item">
            <div>{item.name}</div>
            <button>Delete</button>
          </div>
        );
      })}
      {JSON.stringify(todoList)}
    </div>
  );
};

export default TodoData;
