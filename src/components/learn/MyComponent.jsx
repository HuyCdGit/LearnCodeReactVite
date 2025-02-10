import "./style.css";

const MyComponent = () => {
  //   const example = "example"; //string
  //   const example = 25; // number
  //   const example = true; // boolean
  //   const example = undefined; // undefined
  //   const example = null; // null

  const example = [1, 2, 3]; // array
  //   const example = {
  //     name: "test",
  //     age: 25,
  //   };

  return (
    <>
      <div>{JSON.stringify(example)} My Component update</div>
      <div>{console.log("test")}</div>
      <div className="child" style={{ borderRadius: "10px" }}>
        child
      </div>
    </>
  );
};
export default MyComponent;
