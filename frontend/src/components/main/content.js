import React from 'react'

const Content = (props) => {
  
  if (props.content === 'welcome'){
    return (
    <div className='content'>
        <h1 className='welcome'>Welcome Back!</h1>
    </div>)
  } else if (props.content === 'users') {
    return (
      <div className='content'>
          <h1 className='welcome'>Users</h1>
      </div>
    )
  } else if (props.content === 'students'){
    return (
      <div className='content'>
          <h1 className='welcome'>Students</h1>
      </div>
    )
  } else if (props.content === 'grades'){
    return (
      <div className='content'>
          <h1 className='welcome'>Grades</h1>
      </div>
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
