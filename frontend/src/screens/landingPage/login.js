import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';

  /*<form >
                <label for='email'>Email:</label>
                <input id="email" type="email" name="email" placeholder='example@example.com'></input>
                <label for='password'>Password:</label>
                <input id="password" type="password" name="password"></input>
                <Button size="lg" className='button'>Login</Button>
                <button type = "submit" value = "Submit" className='button'>Submit</button>
            </form>*/

const Login = () =>{

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }
      setLoading(true);

      const {data} = await axios.post('/api/users/login', {email,password},config);
      console.log(data);
      localStorage.setItem('userinfo',JSON.stringify(data));

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className='login-background'>
        <div className='login-box'>
            <img src = "test.jpeg" alt = "Lifted Beta logo" ></img>
            <h2>Log in</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" type="submit" className='button'>
                Submit
              </Button>
            </Form>
        </div>
    </div>
  )
};

export default Login;
