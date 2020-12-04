import React from 'react';
import ReactDom from 'react-dom';

const UploadModal = (props) => {
  return ReactDom.createPortal(
  
                <div className={`${props.uploadModalState === "upload-modal" ? "upload-modal-background": "no-modal"}`} >
                  <div className={"upload-modal"}>
                    <h1>Upload Image</h1>
                    <form>
                      <input />
                    </form>
                  </div>
                </div>
      , document.getElementById("upload-modal-portal")
  )
}
export default UploadModal;