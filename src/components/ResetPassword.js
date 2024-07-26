import axios from 'axios'
import React, { useState, useRef } from "react";
import { Link,useNavigate } from 'react-router-dom'

const Reset_Password = () => {
  const navigate = useNavigate()

  const divRef = useRef()
  const formRef = useRef()

  const [token, setToken] = useState('')
  const [newPass,setNewPass]=useState('')

  const [email, setEmail] = useState('')
  
  const handlePasswordCheck = () => {
    axios.post("http://localhost:3500/api/reset-password",{email})
      .then(res => res.data)
      .then(result => {
        alert(`Copy this code : ${result.token} and paste it with your updated Password to reset it.`)
          divRef.current.style.display="block";
          formRef.current.style.display='none';
      })
      .catch(err=>console.log(err.message))
  }

  const handlePasswordChange = () => {
    axios.post(`http://localhost:3500/api/reset-password/${token}`, { password: newPass })
      .then(response => response.data)
      .then(result => {
        alert(`${result.message}`)
        navigate('/')
      })
      .catch(err => {
        alert(err.message)
      })
  }

    return (
      <form >
        <div ref={formRef}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Enter your registered email Address to Change Password</label>
    <input type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your Information with anyone else.</div>
        </div>
        <button id="reset-pass" type="button" className="btn btn-primary" onClick={handlePasswordCheck}>Reset</button>
        <Link to="/"> <button id="reset" type="button" className="btn btn-primary">Back</button></Link> </div>
        <div style={{ display: "none" }} ref={divRef} className="container" id="inner">
          <p>Paste the copied code here</p>
          <input type="password" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={token} onChange={(e) => setToken(e.target.value)} />
          <p style={{marginTop:"30px"}}>Enter the new Password</p>
          <input type="text" required className="form-control" id="token" aria-describedby="emailHelp" value={ newPass} onChange={(e)=>setNewPass(e.target.value)} />
          <button id="reset-pass-btn" type="button" className="btn btn-primary" onClick={handlePasswordChange }>Change</button>
          </div>
      </form>
  )
}

export default Reset_Password