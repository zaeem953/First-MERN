import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const SignUp = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate=useNavigate()

  const collectData = async () => {
    console.log(name, password, email);
    let result = await fetch("http://localhost:3000/register", {
      method: "post",
      body: JSON.stringify({ name, password, email }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    result = await result.json();
    console.log(result);

    if(result){
        navigate("/")
    }
  }

  return (
    <div className='signup'>
      <h1>Register</h1>
      <input placeholder='Enter Name' type='text' className='inputBox' value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder='Enter Email' type='text' className='inputBox' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder='Enter password' type='password' className='inputBox' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='signup-btn' onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default SignUp;
