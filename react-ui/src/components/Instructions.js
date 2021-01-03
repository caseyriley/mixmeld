import React from 'react';
import ReactDom from 'react-dom';
const Instructions = (props)=>{
  return ReactDom.createPortal(
    <>
    <div id={"instructions-modal-background"} onClick={()=>{props.setInstructionsModalState(false)}}></div>
    <div id={"instructions-modal"}>
      <div id={"instructions-modal__scroll"}>
        <h1>Instructions</h1>

      </div>
    </div>
    </>
  , document.getElementById("instructions-modal-root"))
}
export default Instructions;