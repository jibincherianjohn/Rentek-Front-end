import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Footer() {
  return (
    <div>
<Row style={{ width: '100%' }} >



<Col lg={3} md={6} sm={12} xs={12} className='ps-3'>
    {/* <h3 className='text-light fs-6'> <img src="" style={{width:'40px', height:'40px'}} alt="" />Project Fairk</h3> */}
    <p> <b className='fs-6'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ipsum, dignissimos,
         ratione numquam, iste dolore tempora! Voluptatem, optio!</b> </p>
</Col>
<Col lg={3} md={6} sm={12} xs={12} className='ps-3' >
    <h4>Link</h4>
    <a href="" className='fs-5' style={{ textDecoration: 'none', color: 'red' }}>Home</a> <br />
    <a href="" className='fs-5' style={{ textDecoration: 'none', color: 'red' }}>Login</a> <br />
    <a href="" className='fs-5' style={{ textDecoration: 'none', color: 'red' }}> Register</a> <br />
</Col>

<Col lg={3} md={6} sm={12} xs={12} className='ps-3'>

    <h4>Guides</h4>
    <h5>react</h5>
    <h5>react-bootstrap</h5>
    <h5>routing</h5>



</Col>
<Col lg={3} md={6} sm={12} xs={12} className=''>
    <h4 className='text-danger' >Contact us</h4>
    <input style={{ border: 'none', borderRadius: '8px' }} type="text" placeholder='email' className='' />
    <button className='btn-danger mt-1 w-50'> send</button> <br />
    <i style={{ margin: '10px', padding: '10px', color: "black" }} class="fa-brands fa-instagram fa-2xl"></i>
    <i style={{ margin: '10px', padding: '10px', color: "black" }} class="fa-brands fa-x-twitter fa-2xl"></i>
    <i style={{ margin: '10px', padding: '10px', color: "black" }} class="fa-brands fa-facebook fa-2xl"></i>
</Col>

</Row>
    </div>
  )
}

export default Footer