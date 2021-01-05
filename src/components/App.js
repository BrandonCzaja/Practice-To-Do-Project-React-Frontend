import React from "react";

export const App = (props) => {
  ///////////
  // STATE
  ///////////

  // Create a blank form as the initialize form state and state to reset to once the form is submitted
  const blankForm = {
    title: "",
    body: "",
  };

  // Create state to hold API data
  const [todos, setTodos] = React.useState([]);

  // Create state for the form and set it to the blank form
  const [createForm, setCreateForm] = React.useState(blankForm);

  // Create state to update todos
  const [updateForm, setUpdate] = React.useState(blankForm);

  //
  //
  //

  //////////////
  // FUNCTIONS
  //////////////

  // Create a function to grab the latest list of todos
  const getTodos = async () => {
    // Make a request to the backend server
    const response = await fetch("http://localhost:3000/todos");
    // const response = await fetch(
    //   "https://brandon-czaja-to-do-backend.herokuapp.com/"
    // );
    // Convert the response data to JSON
    const data = await response.json();
    // Assign the response data to the setTodos
    setTodos(data);
  };

  // Function to Render JSX Data
  const TodosLoaded = () => (
    <>
      {todos.map((todo) => (
        <div>
          <h2>{todo.title}</h2>
          <h3>{todo.body}</h3>
          <button onClick={() => setUpdate(todo)}>Edit</button>
        </div>
      ))}
    </>
  );

  // Variable with JSX to display if there aren't any todos
  const noTodos = <h1>Nothing To Do Today, Enjoy Your Free Time</h1>;

  // Update state when the user types in the form
  const handleCreateFormChange = (event) => {
    // Update the form state with the newly typed value based on the form fields (event.target.name)
    setCreateForm({ ...createForm, [event.target.name]: event.target.value });
  };

  // Handle Create Submit
  const handleCreateSubmit = async (event) => {
    // Prevents the form from refreshing the screen
    event.preventDefault();
    // Make a post request to the backend server to create a new To Do
    const response = await fetch("http://localhost:3000/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createForm),
    });
    // Update the list of todos by refetching the list
    await getTodos();
    // Reset the form
    setCreateForm(blankForm);
  };

  // Handle Updating To Do State
  const handleUpdateChange = (event) => {
    setUpdate({ ...updateForm, [event.target.name]: event.target.value });
  };

  // Handle Update Submit
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    // Make Put request to backend server
    const response = await fetch(
      "http://localhost:3000/todos/" + updateForm.id,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateForm),
      }
    );
    // Update the list of todos
    await getTodos();
    // Reset the form
    setUpdate(blankForm);
  };

  //
  //
  //

  ///////////////
  // USE EFFECT
  //////////////

  // useEffect will immediately render the list of to dos when the page first loads. If I want the list to rerender again I put those events in the []
  React.useEffect(() => {
    getTodos();
  }, []);

  //
  //
  //

  ////////////////
  //RETURN JSX
  ///////////////

  // In the ternary operator below the app renders the todos if there are any (todos.length > 0) and if there aren't, it renders the noTodos variable
  return (
    <div>
      <h1>The React To Do App</h1>
      <h2>Create a To Do</h2>
      <form onSubmit={handleCreateSubmit}>
        <input
          placeholder="Name"
          type="text"
          name="title"
          value={createForm.title}
          onChange={handleCreateFormChange}
        />
        <input
          placeholder="Task"
          type="text"
          name="body"
          value={createForm.body}
          onChange={handleCreateFormChange}
        />
        <input type="submit" value="Add a To Do" />
      </form>
      <h1>Update a To Do</h1>
      <form onSubmit={handleUpdateSubmit}>
        <input
          type="text"
          name="title"
          value={updateForm.title}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          name="body"
          value={updateForm.body}
          onChange={handleUpdateChange}
        />
        <input type="submit" value="Update To Do" />
      </form>
      <h1>Things To Do</h1>
      {todos.length > 0 ? TodosLoaded() : noTodos}
    </div>
  );
};
