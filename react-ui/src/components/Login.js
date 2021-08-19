import React, {useState} from 'react';
import { API_URL } from '../config';
import GithubIcon from '../images/GithubIcon';
import Instructions from './Instructions';
import SignupModal from './SignupModal';




const Login = () => {

  const [signUpModal, setSignUpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instructionsModalState, setInstructionsModalState] = useState(false);

  const showSignUpModal = () => {
      setSignUpModal(true)
  };
  const hideSignUpModal = () => {
      setSignUpModal(false)
  };

  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    });

    if (response.ok) {
    } else {
    }
    const res = await response.json()
    if (res.auth_token !== undefined) {
        window.localStorage.setItem('auth_token', res.auth_token)
        window.location.reload()
    }

  };

  const loginDemoUser = async () => {
    const demoEmail = "barbarella@hotmail.com";
    const demoPassword = "password";
    let speed=70, i=1, k=0;

    const ghostWriteEmail = () => {
        if (i <= demoEmail.length) {
            let text = demoEmail.slice(0,i);
            setEmail(text);
            i++;
            setTimeout(ghostWriteEmail, speed);
        }
    }
    const ghostWritePassword = () => {
        if (k <= demoPassword.length) {
            let text = demoPassword.slice(0,k);
            setPassword(text);
            k++;
            setTimeout(ghostWritePassword, speed);
        }
    }
    ghostWriteEmail();
    setTimeout(ghostWritePassword, speed*demoEmail.length);
    const demoLogin = async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: `${demoEmail}`, password: `${demoPassword}` }),
        });
        const res = await response.json()
        if (res.auth_token !== undefined) {
            window.localStorage.setItem('auth_token', res.auth_token)
            window.location.reload()
        }
    }
    setTimeout(demoLogin, 1500);
  }



  return(
    <>
      {instructionsModalState ? <Instructions setInstructionsModalState={setInstructionsModalState}/> : null}
      <div className="login-footer__creditBox fade-in">
          <span>Casey Riley</span>
          <div className={"login-footer__creditBox--links"} >
              <a href={"mailto:innerforest7@gmail.com"} target={"_blank"} rel={"noreferrer noopener"}>
                  <img alt={""} src={"https://img.icons8.com/doodle/48/000000/new-post.png"} />
              </a>
              <a href={"https://github.com/caseyriley"} target={"_blank"} rel={"noreferrer noopener"}>
                  <GithubIcon />
              </a>
              <a href={"https://www.linkedin.com/in/casey-riley-3396231a1/"} target={"_blank"} rel={"noreferrer noopener"}>
                  <img src={"https://img.icons8.com/fluent/48/000000/linkedin.png"} alt={""} />
              </a>
              <a href={"https://angel.co/u/casey-riley-1"} target={"_blank"} rel={"noreferrer noopener"}>
                  <img src={"https://img.icons8.com/color/48/000000/angelist.png"} alt={""} />
              </a>
          </div>
      </div>

      <div id={"login-c"} className={"fade-in"} >
        <h1 id={"main-page__title"} >Mix Meld</h1>
        <div id={"login-c__login-form"}>
          <label>Login Email</label>
            <input className="login-input-1"  placeholder="Email" value={email} type="email" onChange={updateEmail} />
            <label>Password</label>
          <input className="login-input-2" type="password" placeholder="Password" value={password} onChange={updatePassword} /> 
          <div className="login-button" onClick={handleSubmit}>
            <span>Login</span>
          </div>
          <div className="login-button" onClick={loginDemoUser}>
            <span>Login As Demo User</span>
          </div>
          <div className="login-button" onClick={showSignUpModal}>
            <span>Sign up</span>
          </div>


          <SignupModal signUpModal={signUpModal} hideSignUpModal={hideSignUpModal} />
          
        </div>
        <div className={"login-instructions"} onClick={()=>{setInstructionsModalState(true)}}>
            <span>Instructions</span>
        </div>
   
      </div>

    </>
  )
}
export default Login;