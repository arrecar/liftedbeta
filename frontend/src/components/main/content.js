import React from 'react'
import Users from '../main/users/users';
import Students from './students/students';
import Grades from './grades/grades';
import { useState } from "react";


const Content = (props) => {

  
  if (props.content === 'welcome'){
    return (
    <div className='content'>
        <h1 className='welcome'>Welcome Back!</h1>
    </div>)
  } else if (props.content === 'users') {
    return (
        <Users type = 'general' updateContent = {props.updateContent}/>
      )
  } else if (props.content === 'editUsers') {
    return (
        <Users type = 'editUsers' updateContent = {props.updateContent}/>
      )
  }else if (props.content === 'createUser') {
    return (
        <Users type = 'createUser' updateContent = {props.updateContent}/>
      ) 
    }else if (props.content === 'students'){
    return (
      <Students type = 'general' updateContent = {props.updateContent}/>
    )
  } else if (props.content === "editStudents"){
    return(
    <Students type = 'editStudents' updateContent = {props.updateContent}/>
    )
  } else if (props.content === "createStudent"){
    return (
      <Students type = 'createStudent' updateContent = {props.updateContent}/>
    )
  } else if (props.role.toLowerCase() === "parent" && props.content === 'grades') {
    return(
      <Grades type ='generalParent' updateContent = {props.updateContent} role = {props.role}/>
    )
  } else if (props.content === 'seeChildGrades'){
    return (
      <Grades type = 'seeChildGrades' />
    )
  } else if (props.content === 'grades'){
    return (
      <Grades type = 'general' updateContent = {props.updateContent}/>
    )
  } else if ( props.content === 'editGrades'){
    return (
      <Grades type = 'editGrades' updateContent = {props.updateContent}/>
    )
  } else if ( props.content === 'createGrades'){
    return(
      <Grades type = 'createGrades' updateContent = {props.updateContent}/>
    )
  } else if (props.content === 'transcripts') {
    return (
      <div className='content'>
          <h1 className='welcome'>Transcripts</h1>
      </div>
    )
  };
}

export default Content;
