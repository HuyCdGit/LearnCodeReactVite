const TodoData = (props) => {
  //console.log("check props:", props);
  // object destructuring
  const { todoList, deletetodo } = props;
  const handleClick = (id) => {
    deletetodo(id);
  };
  return (
    <div className="todo-data">
      {todoList.map((item) => {
        return (
          <div className="todo-item" key={item.id}>
            <div>{item.name}</div>
            <button onClick={() => handleClick(item.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
