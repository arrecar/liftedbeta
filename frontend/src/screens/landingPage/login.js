import React, { useEffect, useState } from 'react';
import {Button, Form, Image } from 'react-bootstrap';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import {Navigate, useNavigate} from 'react-router-dom';
import logo from '../../pictures/logo.png';

  /*<form >
                <label for='email'>Email:</label>
                <input id="email" type="email" name="email" placeholder='example@example.com'></input>
                <label for='password'>Password:</label>
                <input id="password" type="password" name="password"></input>
                <Button size="lg" className='button'>Login</Button>
                <button type = "submit" value = "Submit" className='button'>Submit</button>
            </form>*/

const LoginPage = () =>{
  const navigate=useNavigate();
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [authenticated, setAuthentication] = useState(localStorage.getItem(localStorage.getItem("authenticated")||false));
  //const [loading, setLoading] = useState(false);

  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log(email);
    if (email === ""){
      setError('Please fill out all fields')
    }else {

    try {
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }
      //setLoading(true);

      const {data} = await axios.post('/api/users/login', {email,password},config);
      localStorage.setItem("authenticated",true);
      //console.log(data);
      localStorage.setItem('userinfo',JSON.stringify(data));
      navigate('/mainpage');

      //setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  }};

  return (
    <div className='login-background'>
        <div className='login-box'>
            <Image src={logo} alt = "Lifted Beta logo" className='logo-img-login'/>
            <h1>Log in</h1>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {console.log(error)}
            <Form onSubmit={submitHandler} className='loginform'>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
              </Form.Group>
              <Button variant= 'danger' type="submit" className='buttonlogin'>
                Submit
              </Button>
            </Form>
        </div>
    </div>
  )
};

export default LoginPage;
