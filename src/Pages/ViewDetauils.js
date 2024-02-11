import React, { useContext, useEffect } from 'react'
import { addResponseContext, profileResponseContext, viewResponseContext } from '../Context-api/ContextShare'
import { Button, Col, Row } from 'react-bootstrap'
import { Base_URL } from '../Service/base_url'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
function ViewDetauils() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const navigate=useNavigate()

  const [book, setBook] = useState({

    name: "", cv: "", cardno: "", dates: "",expmonth:""
  })


  // check date state
  const [startDate, setStartDate] = useState(new Date());
  // pdf 
  const doc = new jsPDF();

  const SetData = (e) => {
    const { name, value } = e.target
setBook({...book ,[name]:value})
  }
console.log(book);

// use context
  const { viewUpdate } = useContext(viewResponseContext)
  const {profileUpdate}=useContext(profileResponseContext)


  useEffect(()=>{
    if(localStorage.getItem("token")){
        const token=localStorage.getItem("token")
    }
    else{
        alert("Please login first!")
        navigate('/')
    }
})


const handleBook= (e)=>{
  e.preventDefault()
  alert("bookimg Succuess")
  handleClose()
  navigate('/')
}

  return (
    <div>


      <div className='bg-white shadow-lg p-4 m-3'>

        <div className='container bg-black p-3 mt-5 mb-4 rounded-3xl border shadow-lg shadow-white'>
          <img style={{ width: '100%', height: '500px' }} src={`${Base_URL}/uploads/${viewUpdate.projectImage}`} alt="" />

          <h2 className=' mt-4 text-warning font-semibold'>{viewUpdate.title}</h2>
          <h4 className='text-white mt-4 fs-5 font-semibold'><i class="fa-solid fa-location-dot fa-lg text-primary me-1"></i>{viewUpdate.address}</h4>
          <p className='fs-5 text-white mt-4 font-semibold'><i class="fa-solid fa-tag fa-lg text-success me-1"></i>{viewUpdate.description}</p>

          <p className='fs-3 mt-3 font-semibold text-white'><i class="fa-solid fa-indian-rupee-sign fa-lg text-warning"></i> {viewUpdate.amount}</p>
          <p className='fs-5 mt-3 font-semibold text-white' ><i class="fa-solid fa-phone "></i> Contact Owner : {viewUpdate.Phones}</p>


          <div>
            <Button onClick={handleShow} className='btn btn-outline-info'>Book Now </Button>
            <div className="Demo__some-network p-4">



            </div>

          </div>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row className='w-100'>

            <Col lg={6} >
              <input type="text" placeholder='name' name='title' value={profileUpdate.user} className='form-contol' style={{ border: 'none' }} />
              <hr className='' />
              <input type="text"  value={profileUpdate.email} id="email" className='form-contol' style={{ border: 'none' }} name="email" placeholder="john@example.com"></input>
              <hr className='' />

              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              <hr />
              <input type="text" value={profileUpdate.Phone} placeholder='Phone no' name='Phones' className='form-contol' style={{ border: 'none' }} />
              <hr className='' />
            </Col>
            {/* <Row className='w-100'> */}
              <Col lg={6}>
              <div class="form-floating mb-3">

<input formControlName="location" type="text" class="form-control" id="exampleFormControlInput1"
  placeholder="John -jake" />
<label for="exampleFormControlInput1" class="form-label">Card user Name</label>
</div>
               
                <hr />
                <div class="form-floating mb-3">

                  <input formControlName="location" type="text" class="form-control" id="exampleFormControlInput1"
                    placeholder="1111-2222-3333-4444" />
                  <label for="exampleFormControlInput1" class="form-label">Card No</label>
                </div>

                <div class="form-floating mb-3">

                  <input formControlName="location" type="text" class="form-control" id="exampleFormControlInput1"
                    placeholder="4/24" />
                  <label for="exampleFormControlInput1" class="form-label">EXp month</label>
                </div>
                <hr />
                <div class="form-floating mb-3">

<input formControlName="location" type="text" class="form-control" id="exampleFormControlInput1"
  placeholder="123" />
<label for="exampleFormControlInput1" class="form-label">Cvv</label>
</div>

              </Col>
            {/* </Row> */}
          </Row>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleBook(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ViewDetauils