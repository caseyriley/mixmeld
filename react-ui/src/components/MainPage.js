import React from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'

const MainPage = () => {
  return (
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
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