import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <h1>Carlos Arredondo</h1>
      <Nav.Item onClick={ () => {
        localStorage.removeItem("userinfo");
        localStorage.removeItem("authenticated");
        navigate('/');
      }}>Logout</Nav.Item>
    </div>
  )
};

export default Header;
