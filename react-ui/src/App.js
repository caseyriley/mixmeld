import React from 'react';
import Login from './components/Login';
// import { BrowserRouter} from "react-router-dom";
import MainPage from './components/MainPage';

function App() {
  const {resolve} = require('path')
  // require('dotenv').config({ path: "../../formless-music-player"});
  require('dotenv').config({path: "../../.env"})
  // require('dotenv').config({ path: resolve("../../formless-music-player", ".env")});
  console.log('REACT_APP_BASE_URL1', process.env.REACT_APP_BASE_URL)
  console.log("Current directory:", __dirname)
  // console.log("Current directory:", { path: resolve("../../", ".env")})
  const loggedIn = window.localStorage.getItem("auth_token");

  return (
    <div className="App">
      {loggedIn ? <MainPage/> : <Login/>}
      {/* <MainPage/> */}
    </div>
  );

}

export default App;
