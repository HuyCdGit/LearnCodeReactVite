const TodoData = (props) => {
  //console.log("check props:", props);
  // object destructuring
  const { name, age, data, todoList } = props;
  return (
    <div className="todo-data">
      <div>{name}</div>
      <div>{age}</div>
      <div>{JSON.stringify(data)}</div>
      {JSON.stringify(todoList)}
    </div>
  );
};

export default TodoData;
