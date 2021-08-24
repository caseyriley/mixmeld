import React, { useState } from "react";
import { API_URL } from "../config";
import CloseButton from "../images/CloseButton";

const SignUp = (props) => {
  const [usernameState, setUsernameState] = useState();
  const [emailState, setEmailState] = useState();
  const [passwordState, setPasswordState] = useState();
  const [passwordConfirmState, setPasswordConfirmState] = useState();
  const [firstnameState, setFirstnameState] = useState();
  const [lastnameState, setLastnameState] = useState();
  const [zipcodeState, setZipcodeState] = useState();
  const [errorState, setErrorState] = useState({ email: true, password: true });
  const [emailReqState, setEmailReqState] = useState(false);
  const [passwordReqState, setPasswordReqState] = useState(false);

  const updateUsernameState = (e) => setUsernameState(e.target.value);
  const updateEmailState = (e) => setEmailState(e.target.value);
  const updatePassword = (e) => setPasswordState(e.target.value);
  const updatePasswordConfirm = (e) => setPasswordConfirmState(e.target.value);
  const updateFirstname = (e) => setFirstnameState(e.target.value);
  const updateLastname = (e) => setLastnameState(e.target.value);
  const updateZipcode = (e) => setZipcodeState(e.target.value);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  function showEmailReq() {
    let prev = emailReqState;
    setEmailReqState(!prev);
  }

  function showPasswordReq() {
    let prev = passwordReqState;
    setPasswordReqState(!prev);
  }

  const submitUser = async (e) => {
    e.preventDefault();

    let prev = { email: true, password: true, passwordConfirm: true };

    if (validateEmail(emailState) === false) {
      prev.email = false;
    }

    if (validatePassword(passwordState) === false) {
      prev.password = false;
    }

    if (passwordState !== passwordConfirmState) {
      prev.passwordConfirm = false;
    }

    const user = {
      username: usernameState,
      email: emailState,
      password: passwordState,
      firstname: firstnameState,
      lastname: lastnameState,
      zipcode: zipcodeState,
    };

    if (prev.email && prev.password && prev.passwordConfirm) {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res = await response.json();
        if (res.auth_token === undefined) {
          // console.log("");
          return;
        } else {
          window.localStorage.setItem("auth_token", res.auth_token);
          window.location.reload();
        }
      } else {
        console.log("Response Failure");
      }
    }
    setErrorState(prev);
  };

  return (
    <>
      <div id={"signup-modal-background"} onClick={props.handleClose}></div>
      <div className="signup-pop-centering">
        <div className="signup-pop--container">
          <div className="signup-head--container">
            <div className="signup-head--topElements">
              <div
                className="signup__closeButton--container"
                onClick={props.handleClose}
              >
                <div className="signup__closeButton">
                  <CloseButton />
                </div>
              </div>
            </div>
            <div className="signup-head__text">
              <p>Create your account</p>
            </div>
          </div>
          <div className="signup-form--container">
            <div className="signup-form__account-fields">
              <input
                className="signup-form__username"
                name="username"
                value={usernameState}
                onChange={updateUsernameState}
                placeholder="User Name"
              />
              <input
                className="signup-form__email"
                name="email"
                value={emailState}
                onChange={updateEmailState}
                placeholder="Email"
                type="email"
              />
            </div>
            {!errorState.email && (
              <div className={"signup-input-error"}>
                <span>
                  Must be a valid email address such as "demo@example.com"
                </span>
              </div>
            )}
            <div className="signup-form__text">
              <p>Please provide a password</p>
            </div>
            <div className="signup-form__password-fields">
              <input
                className="signup-form__password"
                name="password"
                value={passwordState}
                onChange={updatePassword}
                placeholder="Password"
                type="password"
              />
              <input
                className="signup-from__password-confirm"
                name="password-confirm"
                value={passwordConfirmState}
                onChange={updatePasswordConfirm}
                placeholder="Confirm Password"
                type="password"
              />
            </div>
            <div className="signup-form__text">
              <p>Please provide your information</p>
            </div>
            <div className="signup-form__info-fields">
              <input
                className="signup-form__firstname"
                name="firstname"
                value={firstnameState}
                onChange={updateFirstname}
                placeholder="First Name"
              />
              <input
                className="signup-form__lastname"
                name="lastname"
                value={lastnameState}
                onChange={updateLastname}
                placeholder="Last Name"
              />
              <input
                className="signup-form__zipcode"
                name="zipcode"
                value={zipcodeState}
                onChange={updateZipcode}
                placeholder="Zip Code"
              />
            </div>
            <div
              className="signup-form__submitButton--container"
              onClick={submitUser}
            >
              <div className="signup-form__submitButton">
                <span>Submit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
