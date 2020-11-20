import React from 'react';

const MainNav = (props)=>{


  return(
    <div id={"main-nav"}>
      <div className={"main-nav__option"} onClick={()=>(props.switchPlayer("audioPlayer1"))} >
        <span>Stereo</span>
      </div>
      <div className={"main-nav__option"}>
        <span>Playlist</span>
      </div>
      <div className={"main-nav__option"} onClick={() => { 
      localStorage.removeItem("auth_token"); 
      window.location.reload();
      }}>
        <span>Logout</span>
      </div>
    </div>
  )
}
export default MainNav;