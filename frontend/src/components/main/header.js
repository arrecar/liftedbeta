import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <h1>{props.name}</h1>
      <Nav.Item onClick={ () => {
        localStorage.clear()
        /*localStorage.removeItem("userinfo");
        localStorage.removeItem("authenticated");
        localStorage.removeItem("page");*/
        navigate('/');
      }} className='logout'>Logout</Nav.Item>
    </div>
  )
};

export default Header;
