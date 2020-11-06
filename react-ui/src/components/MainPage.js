import React from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'
import playButton from '../images/playButton.svg'

const MainPage = () => {

  const [timeState, setTimeState] = useState(0);
  
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
                <img id={"audio__play-circle__inner__button"} src={playButton} alt={""}></img>
                <div></div>
              </div>
            </div>
            <div id={"audio__volume"}></div>
            <div id={"audio__stop"} ></div>
          </div>
          <div id={"audio__bottom"} > 
            <span id={"audio__bottom__time"} >{}</span>

          </div>
          
        </div>
      {/* <audio
        controls
        src={psychoTantricJuju}
        autoplay
        loop={true}
        >            
        Your browser does not support the
        <code>audio</code> element.
      </audio> */}
      </div>
    </>
  )
}
export default MainPage;