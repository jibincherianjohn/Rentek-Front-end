import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
function Header() {

  const[logedIn,SetLogedIn]=useState(false)
const navigate=useNavigate()

useEffect(()=>{
  if(localStorage.getItem('currentId')){
    SetLogedIn(true)
  }

},[])

const LogOut=(e)=>{
  e.preventDefault()
  localStorage.removeItem('currentId')
  localStorage.removeItem('token')
  localStorage.removeItem('currentuser')
  navigate('/')
}
// console.log(logedIn);

  
  return (
    <div>
      

      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://i.postimg.cc/K84n3S7h/8c3711152108653-63183266c7870.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
      <Link style={{textDecoration:'none'}} to={'/'}> <b>    Rentek</b></Link>  
   
          </Navbar.Brand>
          <Nav className="ms-auto">
     {
       logedIn ?



       <Nav.Link href="#">
     <Button onClick={(e)=>LogOut(e)} className=' btn btn-outline-dark text-end me-auto'><i class="fa-solid fa-user-minus fa-2xl"></i></Button>
     </Nav.Link>
    
     
    :
<Nav.Link href="#">
     <Button className='text-end me-auto btn btn-'><i id='' class="fa-regular fa-user fa-2xl "></i></Button>
     </Nav.Link>

}
     

    
      </Nav>
        </Container>
      </Navbar>      

    </div>
  )
}

export default Header