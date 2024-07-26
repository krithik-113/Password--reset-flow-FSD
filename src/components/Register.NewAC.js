import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterNewAC = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  const navigate = useNavigate()
  const paraRef = useRef()
  const anoParaRef = useRef()

  let [errEmail, setErrEmail] = useState('')
  let [errPass,setErrPass] = useState('')

  const handleUserInfo = () => {
    if (!email) {
      errEmail = "*Required";
      setErrEmail(errEmail)
      paraRef.current.style.display = 'block'; 
      errPass = ''
      setErrPass(errPass)
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errEmail = "Invalid email address";
      setErrEmail(errEmail)
      anoParaRef.current.style.display = 'block'; 
      errEmail = ''
      setErrEmail(errEmail)
    }else if (!pass) {
      errPass = "*Required";
      setErrPass(errPass)
    } else {
       axios
         .post("https://password-reset-flow-fsd.onrender.com/api/user", {
           email: email,
           password: pass,
         })
         .then((res) => {
           if (res.data.message === "User already Exists") {
             alert(res.data.message);
             navigate('/')
           } else {
             alert("Successfully SignUp");
             setEmail("");
             setPass("");
             navigate("/");
           }
         })
         .catch((err) => console.log(err));
    }
   
  }

  return (
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div ref={paraRef} id="emailHelp" className="form-text" style={{color:"red"}}>{errEmail}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e) => setPass(e.target.value)} />
        <div id="emailHelp" ref={ anoParaRef} className="form-text" style={{color:"red"}}>{errPass}</div>
  </div>
          <button type="button" className="btn btn-primary" onClick={handleUserInfo}>SignUp</button>
           <Link to="/"> <button id="reset" type="button" className="btn btn-primary">Back</button></Link>
      </form>
  )
}

export default RegisterNewAC