import React from 'react';
import './App.css';
import UsersBirthDays from "./containers/UsersBirthDays";


const getColor = (count) => {
  if (count <= 2) return 'grey'
  else if (count > 2 && count <= 6) return 'blue'
  else if (count > 6 && count <= 10) return 'green'
  else return 'red'
}

function App() {
  return <UsersBirthDays
      apiUrl="https://yalantis-react-school.herokuapp.com/api/task0/users"
      className="vertical"
      getColor={getColor} />;
}

export default App;
