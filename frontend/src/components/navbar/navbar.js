import React from 'react';
import logo from '../../pictures/logo.png';
import {Button, ButtonGroup, Image } from 'react-bootstrap';


function Navbar(props) {

    if (props.role.toLowerCase() === "administrator") {
        return(
            <div className='navbar'>
                <Image src={logo} alt = "Lifted Beta logo" className='logo-img-navbar'></Image>
                <ButtonGroup className='navlist'>
                    <Button>Users</Button>
                    <Button>Students</Button>
                    <Button>Grades</Button>
                    <Button>Transcripts</Button>
                </ButtonGroup>
            </div> 
        );
    }
    else if (props.role.toLowerCase() === "parent") {
        return ( 
        <div className='navbar'>
            <Image src={logo} alt = "Lifted Beta logo" className='logo-img-navbar'></Image>
            <ButtonGroup className='navlist'>
                <Button>Grades</Button>
                <Button>Transcripts</Button>
            </ButtonGroup>
        </div> 
        );
    }
    else if (props.role.toLowerCase() === "teacher"){
        return(
            <div className='navbar'>
                <Image src={logo} alt = "Lifted Beta logo" className='logo-img-navbar'></Image>
                <ButtonGroup className='navlist'>
                    <Button>Students</Button>
                    <Button>Grades</Button>
                    <Button>Transcripts</Button>
                </ButtonGroup>
            </div> 
        );
    }
}

export default Navbar;