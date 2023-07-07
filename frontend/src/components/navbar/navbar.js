import React from 'react';
import logo from '../../pictures/logo.png';
import {Button, ButtonGroup, Image } from 'react-bootstrap';


function Navbar(props) {

    if (props.role.toLowerCase() === "administrator") {
        return(
            <div className='navbar'>
                <Image src={logo} alt = "Lifted Beta logo" className='logo-img-navbar'></Image>
                <ButtonGroup className='navlist'>
                    <Button onClick={() => props.updateContent('users')}>Users</Button>
                    <Button onClick={() => props.updateContent('students')}>Students</Button>
                    <Button onClick={() => props.updateContent('grades')}>Grades</Button>
                    <Button onClick={() => props.updateContent('transcripts')}>Transcripts</Button>
                </ButtonGroup>
            </div> 
        );
    }
    else if (props.role.toLowerCase() === "parent") {
        return ( 
        <div className='navbar'>
            <Image src={logo} alt = "Lifted Beta logo" className='logo-img-navbar'></Image>
            <ButtonGroup className='navlist'>
                <Button onClick={() => props.updateContent('grades')}>Grades</Button>
                <Button onClick={() => props.updateContent('transcripts')}>Transcripts</Button>
            </ButtonGroup>
        </div> 
        );
    }
    else if (props.role.toLowerCase() === "teacher"){
        return(
            <div className='navbar'>
                <Image src={logo} alt = "Lifted Beta logo" className='logo-img-navbar'></Image>
                <ButtonGroup className='navlist'>
                    <Button onClick={() => props.updateContent('students')} className='navbarbutton'>Students</Button>
                    <Button onClick={() => props.updateContent('grades')} className='navbarbutton'>Grades</Button>
                    <Button onClick={() => props.updateContent('transcripts')} className='navbarbutton'>Transcripts</Button>
                </ButtonGroup>
            </div> 
        );
    }
}

export default Navbar;