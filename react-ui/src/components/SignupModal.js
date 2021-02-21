import React from 'react';
import ReactDom from 'react-dom';
import Signup from './SignUp';

const SignupModal = (props) => {
  const showHideClassName = props.signUpModal ? "modal-showing" : "modal-hiding";
  return ReactDom.createPortal(
    <>
      <div className={showHideClassName}>
          <div className="modal-background"></div>
          <div className="modal-content">
              <div className="signup-content--container">
                  <div className="signup-content">
                      <Signup handleClose={props.hideSignUpModal} />
                  </div>
              </div>
          </div>
      </div>
    </>, 
    document.getElementById('sign-up-modal-root'))
}
export default SignupModal;