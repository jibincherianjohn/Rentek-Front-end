import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { Base_URL } from '../Service/base_url';
import { Link, useNavigate } from 'react-router-dom';
import { viewResponseContext } from '../Context-api/ContextShare';
import { VieDeatailApi } from '../Service/allApi';


function ProjectCard({projecty}) {

const{ setViewupdate}=useContext(viewResponseContext)

const navigate=useNavigate()

const handleView=async (e,id)=>{
  e.preventDefault()

  // token
  if(localStorage.getItem('token')){
 const token =localStorage.getItem('token')

  

  // heaeder
const  reqHeaders = {

    "Content-Type": "application/json",
    "access_token": `Bearer ${token}`
}
  
console.log(reqHeaders);
const result= await VieDeatailApi(reqHeaders,id)

setViewupdate(result?.data)
navigate('/viewDeatils')
  }
}


  return (
    <div>

<Card className='mx-3 mb-3 crd' style={{ width: '18rem', height: '470px' }}>
      <Card.Img className='rounded-xl' style={{ height: '300px' }} variant='top' src={`${Base_URL}/uploads/${projecty.projectImage}`} />
        <Card.Body>
          <Card.Title>{projecty.title}</Card.Title>
          <p><i class="fa-solid fa-location-dot fa-sm text-primary me-1"></i> {projecty.address}</p>

          <Button  onClick={(e)=>handleView(e,projecty._id)}  className='btn btn-outline-info'>View More Details</Button> 
        </Card.Body>

      </Card>

      
    </div>
  )
}

export default ProjectCard