import React from 'react';
import ReactDom from 'react-dom';
const Instructions = (props)=>{
  return ReactDom.createPortal(
    <>
    <div id={"instructions-modal-background"} onClick={()=>{props.setInstructionsModalState(false)}}></div>
    <div id={"instructions-modal"}>
      <div id={"instructions-modal__scroll"}>
        <h1>Instructions</h1>
        <div className={"instruction-c"}>
          <p>1. The easiest way to try mixmeld is by logging in as a demo user.</p>
          <img id={"instruction-1"} src="https://i.gyazo.com/ab42ef8a5683d371eb125e69bf512b96.gif" alt="" width="806"/>
        </div>
        <div className={"instruction-c"}>
          <p>2. Alternatively sign up as a new user.</p>
          <img id={"instruction-2"} src="https://i.gyazo.com/7474962d436332bddfa3ed45c9ad416b.gif" alt="" width="658"/>
        </div>
        <div className={"instruction-c"}>
          <p>3. Once logged in the  most important controls are located at the top 
            of the screen namely: play/pause, skip forward, skip back, random 
            play, loop play, and volume.
          </p>
          <img id={"instruction-3"} src="https://i.gyazo.com/0c3dd7676cd29c439e732e0e3f3a17a7.gif" alt="" width="982"/>
        </div>
        <div className={"instruction-c"}>
          <p>4. Scrubbing the song to the part you want to hear is easy, just click 
            and drag the play-head. 
          </p>
          <img id={"instruction-4"} src="https://i.gyazo.com/1c20eec51f7299d5655265ef39c275bd.gif" alt="Image from Gyazo" width="434"/>
        </div>
        <div className={"instruction-c"}>
          <p>5. Tacks can be organized by Rating, Name, Artist, Album, Time, Genre 
            or Date. A second click will reverse the order. 
          </p>
          <img id={"instruction-5"} src="https://i.gyazo.com/8b268071ce4c3a3c35390b0b87e6b118.gif" alt="" width="982"/>
        </div>
        <div className={"instruction-c"}>
          <p>6. One of the most unique things about mixmeld is the rating system.
            Tracks are rated by selecting a number from 1-5 and a emoji to represent 
            the track. This allows tracks to be compared based on thier feeling.
          </p>
          <img id={"instruction-6"} src="https://i.gyazo.com/6541e33ad257cf231716205912b48fa4.gif" alt="" width="980"/>
        </div>
      </div>
    </div>
    </>
  , document.getElementById("instructions-modal-root"))
}
export default Instructions;