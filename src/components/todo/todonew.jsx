const TodoNew = () => {
  return (
    <form className="NewTodoForm" /*onSubmit={handleSubmit}*/>
      <label htmlFor="task">New todo</label>
      <input
        // value={userInput.task}
        // onChange={handleChange}
        id="task"
        type="text"
        name="task"
        placeholder="New Todo"
      />
      <button>Add Todo</button>
    </form>
  );
};

export default TodoNew;
