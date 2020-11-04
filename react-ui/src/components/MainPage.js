import React from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'

const MainPage = () => {
  return (
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"audio"} >
          <div id={"audio__top"} ></div>
          <div  id={"audio__middle"}>
            <div id={"audio__play-circle"}>
              <div id={"audio__play-circle__inner"}>
                <div></div>
              </div>
            </div>
            <div id={"audio__volume"}></div>
          </div>
          
        </div>
      <audio
        controls
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