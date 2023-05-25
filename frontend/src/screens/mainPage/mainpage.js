import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/main/header'
import Content from '../../components/main/content'

const Mainpage = () => {
  return (
    <div className='layout'>
        <Navbar/>
        <Header/>
        <Content/>
    </div>
  )
}

export default Mainpage
