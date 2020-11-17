import React from 'react';
import Signup from './SignUp';

const SignupModal = (props) => {
  const showHideClassName = props.signUpModal ? "modal-showing" : "modal-hiding";
  return(
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
    </>
  )
}
export default SignupModal;