import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/main/header'
import Content from '../../components/main/content'
import { BrowserRouter, Routes } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Alert } from 'react-bootstrap'


const Mainpage = () => {
  const [authenticated, setauthenticated] = useState(null);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const name = userinfo['firstname'] + ' ' + userinfo['lastname'];
  console.log(name);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated){
    return (
      <Alert variant="danger">
        <strong>You Need to authenticate to access this page!</strong>
      </Alert>
    )
  } else {
  return (
      <div className='layout'>
          <Navbar/>
          <Header name={name}/>
          <Content/>
      </div>
    )
  }
}
export default Mainpage;
