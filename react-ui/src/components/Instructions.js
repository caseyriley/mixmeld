import React from 'react';
import ReactDom from 'react-dom';
import GithubIcon from '../images/GithubIcon';
const Instructions = (props)=>{
  return ReactDom.createPortal(
    <>
    <div id={"instructions-modal-background"} onClick={()=>{props.setInstructionsModalState(false)}}></div>
    <div id={"instructions-modal"}>
      <div id={"instructions-modal__scroll"}>
        <h1>Instructions</h1>
        <div className={"instruction-c"}>
          <p>1. The easiest way to try mixmeld is by logging in as a demo user.</p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/ab42ef8a5683d371eb125e69bf512b96.gif" alt="" width="806"/>
        </div>
        <div className={"instruction-c"}>
          <p>2. Alternatively sign up as a new user.</p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/7474962d436332bddfa3ed45c9ad416b.gif" alt="" width="658"/>
        </div>
        <div className={"instruction-c"}>
          <p>3. Once logged in the  most important controls are located at the top 
            of the window namely: play/pause, skip forward, skip back, random 
            play, loop play, and volume.
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/0c3dd7676cd29c439e732e0e3f3a17a7.gif" alt="" width="982"/>
        </div>
        <div className={"instruction-c"}>
          <p>4. Scrubbing the song to the part you want to hear is easy, just click 
            and drag the play-head. 
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/1c20eec51f7299d5655265ef39c275bd.gif" alt="" width="434"/>
        </div>
        <div className={"instruction-c"}>
          <p>5. Tacks can be organized by Rating, Name, Artist, Album, Time, Genre 
            or Date. A second click will reverse the order. 
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/8b268071ce4c3a3c35390b0b87e6b118.gif" alt="" width="982"/>
        </div>
        <div className={"instruction-c"}>
          <p>6. One of the most unique things about mixmeld is the rating system.
            Tracks are rated by selecting a number from 1-5 and a emoji to represent 
            the track. This allows tracks to be compared based on thier feeling.
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/6541e33ad257cf231716205912b48fa4.gif" alt="" width="980"/>
        </div>
        <div className={"instruction-c"}>
          <p>7. Uploading a track is easily done by clicking the "Upload Track" button located 
            just below the audio controls and following the instructions. Once the 
            track is uploaded you have the option of uploading a image and submitting 
            your new track. 
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/c22e8e6b78a1c6272e2c11bb7d097188.gif" alt="" wclassNameth="688"/>
        </div>
        <div className={"instruction-c"}>
          <p>8. Creating a playlist simple. Just click "Playlist +" and enter the name. 
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/b54f8bc0bb57cb911a1742da21abafdd.gif" alt="" width="700"/>
        </div>
        <div className={"instruction-c"}>
          <p>9. Click "Add Tracks To Playlist" on the left side of the window and 
            then select a playlist to add tracks into. Plus signs will appear on 
            any track not already in the selected playlist. Click a plus sign to
            add a track to the selected playlist.
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/e31d1d04babbdde57494c4a23145b74c.gif" alt="" width="700"/>
        </div>
        <div className={"instruction-c"}>
          <p>10. Easily select a playlist on the left side of the window.
            Drag and drop tracks into any order you desire.
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/33a3ee65ea36d9ea84cdbd5b4efd053c.gif" alt="" width="700"/>
        </div>
        <div className={"instruction-c"}>
          <p>11. Located in the upper left part of the window is the search bar. 
            Type in your query and any related Track Name, Artist Name, and Album
            Name will appear automatically. Clicking on a result will take you to 
            the desired page and query.
          </p>
          <img className={"instruction-gif"} src="https://i.gyazo.com/9ab01d36c0b4ce60a450487ae807ea49.gif" alt="" width="700"/>
        </div>
        <div className={"instruction-c"}>
          <p>12. The rest of the controls are easy to discover <span role="img" aria-label="musical notes">🎵🎶🎵🎶🎵</span>
          </p>
          <div className="login-footer__creditBox">
          

        </div>
          <div className={"login-footer__creditBox--links"} >
          <span id={"instruction-developer-name"}>Casey Riley</span>
            <a href={"mailto:innerforest7@gmail.com"} target={"_blank"} rel={"noreferrer noopener"}>
                <img alt={""} src={"https://img.icons8.com/doodle/48/000000/new-post.png"} />
            </a>
            <a href={"https://github.com/caseyriley"} target={"_blank"} rel={"noreferrer noopener"}>
                <GithubIcon/>
            </a>
            <a href={"https://www.linkedin.com/in/casey-riley-3396231a1/"} target={"_blank"} rel={"noreferrer noopener"}>
                <img src={"https://img.icons8.com/fluent/48/000000/linkedin.png"} alt={""} />
            </a>
            <a href={"https://angel.co/u/casey-riley-1"} target={"_blank"} rel={"noreferrer noopener"}>
                <img src={"https://img.icons8.com/color/48/000000/angelist.png"} alt={""} />
            </a>
          </div>
        
        </div>
      </div>
    </div>
    </>
  , document.getElementById("instructions-modal-root"))
}
export default Instructions;