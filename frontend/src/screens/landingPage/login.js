import React from 'react'

function Login(){
  return (
    <div className='login-background'>
        <div className='login-box'>
            <img src='../../pictures/logo.png' alt = "Lifted Beta logo" ></img>
            <h2>Log in</h2>
            <form>
                <label for='email'>Email:</label>
                <input id="email" type="email" name="email" placeholder='example@example.com'></input>
                <label for='password'>Password:</label>
                <input id="password" type="password" name="password"></input>
                <button type = "submit" value = "Submit" className='button'>Submit</button>
            </form>
        </div>
    </div>
  )
};

export default Login;