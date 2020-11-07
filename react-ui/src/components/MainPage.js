import React, {useState} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'
import playButton from '../images/playButton.svg'

const MainPage = () => {

  const [timeState, setTimeState] = useState("0:00");

  function play(){
    const audio = document.getElementById("audio");
    audio.audioTracks[0].enabled = true;
  }

  return (
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"audio"} >
          <div id={"audio__top"} >
            <p id={"audio__top__song-name"}>Song Name</p>
          </div>
          <div  id={"audio__middle"}>
            <div id={"audio__play-circle"}>
              <div id={"audio__play-circle__inner"}>
                <img id={"audio__play-circle__inner__button"} src={playButton} alt={""} onClick={play}></img>
                <div></div>
              </div>
            </div>
            <div id={"audio__volume"}></div>
            <div id={"audio__stop"} ></div>
          </div>
          <div id={"audio__bottom"} > 
            <div id={"audio__bottom__time"}>
              <span id={"audio__bottom__time__start"} >{timeState}</span>
              <span id={"audio__bottom__time__end"} >{timeState}</span>
            </div>
            <div id={"audio__bottom__playhead"} >
              <div id={"audio__bottom__playhead__left"} ></div>
            </div>

          </div>
          
        </div>
      <audio
        id={"audio"}
        // controls
        src={psychoTantricJuju}
        autoplay
        loop={true}
        >            
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      </div>
    </>
  )
}
export default MainPage;