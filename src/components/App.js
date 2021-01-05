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
    const response = await fetch(
      "https://brandon-czaja-to-do-backend.herokuapp.com/"
    );
    // Convert the response data to JSON
    const data = await response.json();
    // Assign the response data to the setTodos
    setTodos(data);
  };

  return <h1>Hello World</h1>;
};
