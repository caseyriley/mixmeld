import React from 'react';
import Login from './components/Login';
import MainPage from './components/MainPage';

function App() {
  const loggedIn = window.localStorage.getItem("auth_token");

  return (
    <div className="App">
      {loggedIn ? <MainPage/> : <Login/>}
    </div>
  );

}

export default App;
