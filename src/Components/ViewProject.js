import React, { useContext, useEffect, useState } from 'react'
import UpdateProject from './UpdateProject'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { GetProjectApi, removeAPi } from '../Service/allApi';
import { Base_URL } from '../Service/base_url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'react-feather';
import { addResponseContext, editResponseContext } from '../Context-api/ContextShare';




function ViewProject() {

const {addUpdate}=useContext(addResponseContext)

const {editUpdate}=useContext(editResponseContext)

  const [UserP, SetUserP] = useState([])
  



  const getallproject = async () => {

   

    //   id
    if (localStorage.getItem('currentId')) {
      const id = localStorage.getItem('currentId')

      console.log(id);
      //  token

      const token = localStorage.getItem('token')

      // header
      const reqHeader = {
        "Content-Type": "application/json",
        "access_token": `Bearer ${token}`
      }
      console.log(reqHeader);

      const result = await GetProjectApi(reqHeader,id)  

      if (result.status == 200) {
        SetUserP(result.data)
        
      }

    }
  }
  console.log(UserP);


  const handledelete = async (e,id) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    console.log(token);

    const reqHeader = {
      "Content-Type": "application/json",
      "access_token": `Bearer ${token}`
    }
console.log(reqHeader);
    
    const resultak= await removeAPi(reqHeader,id)
    console.log(resultak);
      toast.success(`${resultak.data}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getallproject()
    

  }

  useEffect(() => {
    getallproject()

  }, [addUpdate,editUpdate]) //addupdate,editupdate

  return (
    <div>
      {  UserP?.length > 0 ?
        
          UserP.map(i => (
            <div className='mt-3 p-4 shadow' >

              <Row style={{ width: '100%' }}>
                <Col lg={8}>  
                <div className='d-flex justify-content-between'> <img style={{width:' 70%'}} src={`${Base_URL}/uploads/${i.projectImage}`}></img>        

                    <div>
                      
                      <span className='mb-3 ms-3 '>Title: {i.title}</span>
                  <hr />
                      <h5 className=' ms-3 mt-3' >description: <span className=''>{i.description}</span></h5>
                
                      <hr />
                          <h5 className='mt-3  ms-3'  > Address : </h5> <span className=' ms-3'>{i.address}</span>
                          <hr />
        
                          <h5 className='mt-4  ms-3'>price: <span>{i.amount}</span> </h5> 
                          <hr />
                          <h5 className='p-3 '>Phone no :  <span className='mx-3'>{i.Phones}</span> </h5> 
                    </div>
                 
                        </div> 
           
               
                </Col>
                
                <Col lg={4} className='text-end'>
                <div className='mt-5'>
                  
                  <UpdateProject  project={i}></UpdateProject>
                 </div>

                  <Button  className='text-end mb-5 px-3'><Trash2 onClick={(e)=>{handledelete(e,i?._id)}}  className='bg-outline-danger'></Trash2></Button>
                </Col>

              </Row>
            </div>

          )
          )
      
    
        :
<p>No property available</p>
        }
 <ToastContainer />
    </div>
  )
}

export default ViewProject