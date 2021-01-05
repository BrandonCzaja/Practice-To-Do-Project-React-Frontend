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
    //const response = await fetch("https://brandon-czaja-to-do-backend.herokuapp.com/");
    // Convert the response data to JSON
    const data = await response.json();
    // Assign the response data to the setTodos
    setTodos(data);
  };

  ///////////////
  // USE EFFECT
  //////////////

  // useEffect will immediately render the list of to dos when the page first loads. If I want the list to rerender again I put those events in the []
  React.useEffect(() => {
    getTodos();
  }, []);

  return <h1>Hello World</h1>;
};
