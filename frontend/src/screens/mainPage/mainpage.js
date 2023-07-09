import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/main/header'
import Content from '../../components/main/content'
import { BrowserRouter, Routes } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Alert, Container} from 'react-bootstrap'




const Mainpage = () => {
  const [authenticated, setauthenticated] = useState(null);
  const [content, setContent] = useState('welcome');


  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const storedContent = localStorage.getItem("page")

    if (loggedInUser) {
      setauthenticated(loggedInUser);
    };
    if (storedContent){
      setContent(storedContent)
    };
  }, []);

  useEffect(() =>{
    localStorage.setItem('page', content );
  }, [content]);

  const updateContent = (page) => {
    setContent(page);
  } 

  if (!authenticated){
    return (
      <Alert variant="danger">
        <strong>You Need to authenticate to access this page!</strong>
      </Alert>
    )
  } else {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    const name = userinfo['firstname'] + ' ' + userinfo['lastname'];
    const role = userinfo['role'];
  return (

      <div className='main-layout'>
          <Navbar role={role} updateContent={updateContent}/>
          <Header name={name}/>
          <Content content={content} updateContent={updateContent}/>
      </div>
    )
  }
}
export default Mainpage;
