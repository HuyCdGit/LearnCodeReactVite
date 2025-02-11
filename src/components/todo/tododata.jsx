const TodoData = (props) => {
  //console.log("check props:", props);
  // object destructuring
  const { todoList } = props;
  return (
    <div className="todo-data">
      {todoList.map((item) => {
        return (
          <div className="todo-item" key={item.key}>
            <div>{item.name}</div>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
