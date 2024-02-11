import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Profile from '../Components/Profile'
import ViewProject from '../Components/ViewProject'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'

function Dash() {

const[uname,setUname]=useState('')
const navigate=useNavigate()

useEffect(()=>{
  if(localStorage.getItem('currentuser')){
    setUname((JSON.parse(localStorage.getItem('currentuser'))).username)
  }else{

    alert('please login frist')
    navigate('/login')
  }
},[])

  return (

    
    <div>
<Header></Header>


<Row style={{ width: '100%' }}>
                <Col lg={8} md={6}>
                    <div className='p-3 m-2  mt-5 shadow bg-white'>

                        <h3 className=''>Welcome <span className='text-danger'>{uname}</span></h3>
                   
                    </div>
                    <div className=''> <ViewProject></ViewProject></div>
                </Col>

                <Col lg={4} md={6}>
                    <div className='py-5 px-3 mx-2 my-5 shadow bg-white'>
                       <Profile></Profile>
                       
                    </div>
                </Col>
            </Row>


    </div>
  )
}

export default Dash