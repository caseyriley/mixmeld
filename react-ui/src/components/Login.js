import React, {useState} from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);


  return(
    <>
      <div id={"login-c"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"login-c__login-form"}>
          <input className="login-input-1"  placeholder="Email" value={email} type="email" onChange={updateEmail} />
          <input className="login-input-2" type="password" placeholder="Password" value={password} onChange={updatePassword} /> 
          <span>Log in</span>
        </div>
      </div>
    </>
  )
}
export default Login;