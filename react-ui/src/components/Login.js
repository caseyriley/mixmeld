import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import GithubIcon from "../images/GithubIcon";
import Instructions from "./Instructions";
import SignupModal from "./SignupModal";

const Login = () => {
  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${API_URL}/api`, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();
      if (res) {
        console.log(res);
      } else {
        console.log("Not hitting the API");
      }
    };
    api();
  }, []);

  const [signUpModalState, setSignUpModalState] = useState(false);
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [instructionsModalState, setInstructionsModalState] = useState(false);
  const [formErrorState, setFormErrorState] = useState(false);
  const [errorState, setErrorState] = useState({email: true, password: true});

  const showSignUpModal = () => {
    setSignUpModalState(true);
  };
  const hideSignUpModal = () => {
    setSignUpModalState(false);
  };

  const updateEmail = (e) => setEmailState(e.target.value);

  const updatePassword = (e) => setPasswordState(e.target.value);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  const handleSubmit = async () => {

    let prev = {email: true, password: true};

    if (validateEmail(emailState) === false) {
      prev.email = false;
    }

    if (validatePassword(passwordState) === false) {
      prev.password = false;
    }

    if (prev.email && prev.password){
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `${emailState}`,
          password: `${passwordState}`,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        setFormErrorState(true);
      }
      if (res.auth_token !== undefined) {
        window.localStorage.setItem("auth_token", res.auth_token);
        window.location.reload();
      }
    }
    setErrorState(prev);
  };

  const loginDemoUser = async () => {
    const demoEmail = "barbarella@hotmail.com";
    const demoPassword = "password";
    let speed = 70,
      i = 1,
      k = 0;

    const ghostWriteEmail = () => {
      if (i <= demoEmail.length) {
        let text = demoEmail.slice(0, i);
        setEmailState(text);
        i++;
        setTimeout(ghostWriteEmail, speed);
      }
    };
    const ghostWritePassword = () => {
      if (k <= demoPassword.length) {
        let text = demoPassword.slice(0, k);
        setPasswordState(text);
        k++;
        setTimeout(ghostWritePassword, speed);
      }
    };
    ghostWriteEmail();
    setTimeout(ghostWritePassword, speed * demoEmail.length);
    const demoLogin = async () => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `${demoEmail}`,
          password: `${demoPassword}`,
        }),
      });
      const res = await response.json();
      if (res.auth_token !== undefined) {
        window.localStorage.setItem("auth_token", res.auth_token);
        window.location.reload();
      }
    };
    setTimeout(demoLogin, 1500);
  };

  return (
    <>
      {instructionsModalState ? (
        <Instructions setInstructionsModalState={setInstructionsModalState} />
      ) : null}
      <div className="login-footer__creditBox fade-in">
        <span>Casey Riley</span>
        <div className={"login-footer__creditBox--links"}>
          <a
            href={"mailto:innerforest7@gmail.com"}
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            <img
              alt={""}
              src={"https://img.icons8.com/doodle/48/000000/new-post.png"}
            />
          </a>
          <a
            href={"https://github.com/caseyriley"}
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            <GithubIcon />
          </a>
          <a
            href={"https://www.linkedin.com/in/casey-riley-3396231a1/"}
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            <img
              src={"https://img.icons8.com/fluent/48/000000/linkedin.png"}
              alt={""}
            />
          </a>
          <a
            href={"https://angel.co/u/casey-riley-1"}
            target={"_blank"}
            rel={"noreferrer noopener"}
          >
            <img
              src={"https://img.icons8.com/color/48/000000/angelist.png"}
              alt={""}
            />
          </a>
        </div>
      </div>
          
      <div id={"login-c"} className={"fade-in"}>
        <h1 id={"main-page__title"}>Mix Meld</h1>
        <div id={"login-c__login-form"}>
          <label>Login Email</label>
          <input
            className={`login-email-input ${errorState.email === false ? "login-error" :  ""}`}
            placeholder="Email"
            value={emailState}
            type="email"
            onChange={updateEmail}
          />
          <label>Password</label>
          <input
            className={`login-input-2 ${errorState.password === false ? "login-error" : ""}`}
            type="password"
            placeholder="Password"
            value={passwordState}
            onChange={updatePassword}
          />
          <div className={"login-button"} onClick={handleSubmit}>
            <span>Login</span>
          </div>
          <div className={"login-button"} onClick={loginDemoUser}>
            <span>Login As Demo User</span>
          </div>
          <div className={"login-button"} onClick={showSignUpModal}>
            <span>Sign up</span>
          </div>
          {formErrorState && (
            <div className={"form-error-message"} onClick={()=>{setFormErrorState(false)}}>
              <span>Invalid email or password</span>
            </div>
          )}

          <SignupModal
            signUpModal={signUpModalState}
            hideSignUpModal={hideSignUpModal}
          />
        </div>
        <div
          className={"login-instructions"}
          onClick={() => {
            setInstructionsModalState(true);
          }}
        >
          <span>Instructions</span>
        </div>
      </div>
    </>
  );
};
export default Login;
