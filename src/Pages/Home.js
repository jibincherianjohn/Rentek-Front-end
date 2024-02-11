import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { ArrowDown, Star, Zap } from 'react-feather'
import { Link } from 'react-router-dom'
import { GetLimtProApi } from '../Service/allApi'
import ProjectCard from '../Components/ProjectCard'
import Header from '../Components/Header'

function Home() {

const[logedIn,SetLogedIn]=useState(false)

const [homeProject,SethomeProject]=useState([])


useEffect(()=>{
  if(localStorage.getItem('currentId')){
    SetLogedIn(true)
  }

},[])
// console.log(logedIn);

const getHomeProject=async()=>{
  
  const response =await GetLimtProApi()
  
  SethomeProject(response.data)
}
console.log(homeProject);


useEffect(()=>{
  getHomeProject()
},[])

  return (
    <div>
<Header></Header>
  <Row className='w-100 mt-2' >

  <Col className='mt-4 ' lg={6}>
  
  
  
  <div className='mt-3 p-4'>

  <h4 className=' m-4 '>Rentek</h4>
       <p className='mt-2 align-center'>
         RenteK is PlatForm where you can rent
         -out and rent apartment
          as you wish .To get start to
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
           adipisci autem, at corrupti dolore dolorum ab.
  
        </p> 
      
    { logedIn ?

     <Link style={{textDecoration:'none'}} to={'dash'}> 
     <Button  className='  btn btn-outline-success ms-4'> cHange <Star size={25}></Star></Button> 
     </Link>
     :
     <Link style={{textDecoration:'none'}} to={'login'}>
      
      <Button className='btn btn-outline-dark'>Get started <ArrowDown></ArrowDown></Button>
  </Link>
  }
  </div>
  </Col>
<Col lg={6}>
<div className='d-flex'>
      
      <img className='mt-4' src="https://i.postimg.cc/50Yn56d7/86aa8aad36472b36bfb98c4d1317a513.gif" alt="" style={{width:'80%'}} />
      </div>
</Col>
  </Row>
  <hr />
  <Row className='w-100'>
                    {homeProject?.length > 0 ? homeProject.map(i => (
                        <Col lg={4} md={12}>
                           <ProjectCard projecty={i}></ProjectCard>
                        </Col>))
                        :
                        <h4 className='text-center text-warning'><i class="fa-solid fa-spinner fa-spin fa-xl"></i></h4>
                    }
                </Row>
      
  <Link to={'/singleview'} style={{textDecoration:"none"}}>  <p className='text-danger text-center mb-3 bg-dark'><b className='fs-4'>Explore more <Zap size={20}></Zap></b></p></Link>
    </div>
  )
}

export default Home