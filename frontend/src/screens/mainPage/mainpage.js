import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/main/header'
import Content from '../../components/main/content'
import { BrowserRouter, Routes } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Alert, Container} from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Mainpage = () => {
  const [authenticated, setauthenticated] = useState(null);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const name = userinfo['firstname'] + ' ' + userinfo['lastname'];
  const role = userinfo['role'];

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

      <div className='main-layout'>
          <Navbar role={role}/>
          <Header name={name}/>
          <Content/>
      </div>
    )
  }
}
export default Mainpage;
