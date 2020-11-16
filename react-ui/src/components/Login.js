import React, {useState} from 'react';
import { API_URL } from "../config";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div id={"login-c"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"login-c__login-form"}>
          <input className="login-input-1"  placeholder="Email" value={email} type="email" onChange={updateEmail} />
          <input className="login-input-2" type="password" placeholder="Password" value={password} onChange={updatePassword} /> 
          <div className="login-submit-button" onClick={handleSubmit}>
            <span>Log in</span>
          </div>
          <div className="login-block__demo--container" onClick={loginDemoUser}>
            <span>Log in as Demo User</span>
          </div>
          
        </div>
      </div>
    </>
  )
}
export default Login;