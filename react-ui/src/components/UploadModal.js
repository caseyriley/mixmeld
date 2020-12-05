import React from 'react';
import ReactDom from 'react-dom';
import UploadingImage from './UploadingImage';

const UploadModal = (props) => {
  return ReactDom.createPortal(
  
                <div className={`${props.uploadModalState === "upload-modal" ? "upload-modal-background": "no-modal"}`} >
                  <div className={"upload-modal"}>
                    <h1>Upload Image</h1>
                    <UploadingImage trackLocationState={props.trackLocationState}/>
                    <form id={"upload-modal__form"}>
                    <label for={"upload-modal__form__track-artist"}>Artist</label>
                    <input 
                        name={"trackartist"}
                        type={"text"}
                        id={"upload-modal__form__track-artist"} 
                        maxLength={100} 
                        placeholder={""} 
                      />
                    <label for={"upload-modal__form__track-name"}>Track Name</label>
                    <input 
                        name={"trackartist"}
                        type={"text"}
                        id={"upload-modal__form__track-name"} 
                        maxLength={100} 
                        placeholder={""} 
                      />
                    <label for={"upload-modal__form__genre-name"}>Genre Name</label>
                    <input 
                        name={"trackartist"}
                        type={"text"}
                        id={"upload-modal__form__genre-name"} 
                        maxLength={100} 
                        placeholder={""} 
                      />
                      <input className={""} type={"submit"} />
                    </form>
                  </div>
                </div>
      , document.getElementById("upload-modal-portal")
  )
}
export default UploadModal;