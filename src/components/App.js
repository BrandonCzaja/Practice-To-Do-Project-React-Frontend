import React from "react";

export const App = (props) => {
  /////////
  // STATE
  /////////

  // Create state to hold API data
  const [todos, setTodos] = React.useState([]);

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

  /////////////////////////////
  // RENDERING THE JSX DATA
  ////////////////////////////

  // I get an error when I try to render JSX because the React.useEffect only renders the page on the initial load, before the data is returned from the API (hence the async await)
  // To fix this, I need conditionally render the data with a ternary operator
  const TodosLoaded = () => (
    <div>
      {todos.map((todo) => (
        <div>
          <h2>{todo.title}</h2>
          <h3>{todo.body}</h3>
        </div>
      ))}
    </div>
  );

  // Variable with JSX to display if there aren't any todos
  const noTodos = <h1>Nothing To Do Today, Enjoy Your Free Time</h1>;

  ///////////////
  // USE EFFECT
  //////////////

  // useEffect will immediately render the list of to dos when the page first loads. If I want the list to rerender again I put those events in the []
  React.useEffect(() => {
    getTodos();
  }, []);

  ////////////////
  //RETURN JSX
  ///////////////

  // In the ternary operator below the app renders the todos if there are any (todos.length > 0) and if there aren't, it renders the noTodos variable
  return (
    <div>
      <h1>The React To-Do App</h1>
      {todos.length > 0 ? TodosLoaded() : noTodos}
    </div>
  );
};
