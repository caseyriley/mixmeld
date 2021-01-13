import React from 'react';
import Login from './components/Login';
// import { BrowserRouter} from "react-router-dom";
import MainPage from './components/MainPage';

function App() {
  require('dotenv').config();
  console.log('REACT_APP_BASE_URL1', process.env.REACT_APP_BASE_URL)
  const loggedIn = window.localStorage.getItem("auth_token");

  return (
    <div className="App">
      {loggedIn ? <MainPage/> : <Login/>}
      {/* <MainPage/> */}
    </div>
  );

}

export default App;
