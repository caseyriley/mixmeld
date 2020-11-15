import React from 'react';

const MainNav = (props)=>{
  
  return(
    <div id={"main-nav"}>
      <div className={"main-nav__option"} onClick={()=>(props.setAudioSwitchState("audioPlayer1"))} >
        <span>Stereo</span>
      </div>
      <div className={"main-nav__option"}>
        <span>Playlist</span>
      </div>
    </div>
  )
}
export default MainNav;