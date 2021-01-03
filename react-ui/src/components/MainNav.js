import React from 'react';

const MainNav = (props)=>{

  async function switchAudioPlayer(player){
    let clearAllIntervals = await function (e) {
      for(let i=0; i<100; i++)
      {
          window.clearInterval(i);
      }
    }
    clearAllIntervals()
    props.SetAudioSwitchState(player)
  }
  return(
    <div id={"main-nav"}>
      {/* <div className={"main-nav__option"} onClick={()=>{switchAudioPlayer("AudioPlayer1")}} >
        <span>Stereo</span>
      </div>
      <div className={"main-nav__option"} onClick={()=>{switchAudioPlayer("AudioPlayer2")}} >
        <span>Track List</span>
      </div> */}
      <div className={"main-nav__option"}>
        <span>Instructions</span>
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