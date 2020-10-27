import React from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'

const MainPage = () => {
  return (
    <>
      <div id={"main-page"}>
      <audio
        controls
        src={psychoTantricJuju}>            
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      </div>
    </>
  )
}
export default MainPage;