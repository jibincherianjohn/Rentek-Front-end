import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Edit } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProject from './AddProject';
import { UpdateProfileApi } from '../Service/allApi';
import { Base_URL } from '../Service/base_url';
import { profileResponseContext } from '../Context-api/ContextShare';

function Profile() {

const{setProfileupdate}=useContext(profileResponseContext)


  // state to check validation
  const [unameValid, setUnameValid] = useState(false)
  const [PhoneValid, setPhoneValid] = useState(false)


  const[update,setUpdate]=useState("")

  const [token, setToken] = useState('')

  const [show, setShow] = useState(false);

  const [existingimage, setExistingImage] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [preview, setPreview] = useState("")

  const [profile, setProfile] = useState({

    user: "", image: "", phone: "",email:""
  })


  const setData = (e) => {
    const { value, name } = e.target

    if (name == "user") {

      if (value.match(/^[a-zA-Z ]+$/)) {

        setUnameValid(false)

      }
      else {
        setUnameValid(true)
      }
    }
    if (name == "phone") {

      if (value.match(/^\d{1,10}$/)) {

        setPhoneValid(false)

      }
      else {
        setPhoneValid(true)
      }

    }
    setProfile({ ...profile, [name]: value })
  }
  console.log(profile);


  useEffect(() => {

    const userData = (JSON.parse(localStorage.getItem('currentuser')))

   if(userData){
     setProfile({ ...profile, user: userData?.username, phone: userData.phone, email: userData.email })
    setExistingImage(userData.photo)
  }


  }, [update])



  useEffect(() => {

    if (profile.image) {
      setPreview(URL.createObjectURL(profile.image))
    }
    
  }, [profile.image])
  console.log(preview);


  useEffect(() => {

    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
    


  }, [])
  console.log(token);

  const handleUpdate = async (e) => {
    e.preventDefault()

    const { user, image, phone } = profile

    // if (!user || !image || !phone) {

    //   toast.error('please fill the data', {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
    // else {
      //  id
      if (localStorage.getItem('currentId')) {
        const _id = localStorage.getItem('currentId')

        console.log(_id);

        // header

        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "access_token": `Bearer ${token}`
        }
        console.log(reqHeader);

        // body
        const reqBody = new FormData()
        reqBody.append('username', user)
        reqBody.append('phone', phone)
        reqBody.append('photo', image? image:existingimage)

        // console.log(reqBody);

        const result = await UpdateProfileApi(reqBody, reqHeader, _id)
        console.log(result);
        if (result.status == 200) {

          toast.success('updated  SuccessFully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
                      // updating changed data in localstorage
                  localStorage.setItem('currentuser',JSON.stringify(result.data))

                  setUpdate(result.data)
                  setProfileupdate(result.data)

          handleClose()
        }
        else {

          toast.error(`failed`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }


      }

    // }

  }


  return (
    <div>

      <div>
        <Row style={{ width: "100%" }}>
          <Col >

            <h4 className='text-danger'>
              My Profile
            </h4>
          </Col>

          <Col className='text-end' >
            <div className=''>

              <i class="fa-solid fa-circle-check fa-2x text-success"></i>

            </div >

          </Col>

        </Row>
        <div className='text-center'>

        {  existingimage != "" ?
                <img className=' w-50  ms-3 rounded-pill' src={preview ? preview : `${Base_URL}/uploads/${existingimage}`} alt=""
                />
                :
                <img className=' w-50  ms-3 rounded-pill' src={preview ? preview : "https://i.postimg.cc/vTX0T4sv/image.jpg"} alt=""
                />

}

        </div>
        <Container className=''>
          <hr className='text-danger' />
          <p className='py-3'><b> Username : </b>   <b className='fs-5' >  {profile.user} </b></p>
          <hr className='text-danger' />
          <p className='py-3'><b>phone no  :</b>  <b className='fs-6'>{profile?.phone}</b> </p>
          <hr className='text-danger' />
          <p className='py-2'><b>Email Id  : </b> : <b className='fs-6'>{profile?.email}</b> </p>
          <hr className='text-danger' />

          <p className='py-3  text-end'><span className='btn-fs-3 text-info' onClick={handleShow} >< Edit className=' text-succes' size={30} ></Edit  ></span></p>

          <p className='ms-auto text-center'><AddProject></AddProject></p>


          <Modal show={show}
            onHide={handleClose}
            backdrop='static'
            size='md'
            centered


          >
            <Modal.Header closeButton>
              <Modal.Title><h4 >Update Profie</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor='imgj' className='text-center ms-5 ' >
               {  existingimage != "" ?
                <img className=' w-50  ms-3 rounded-pill' src={preview ? preview : `${Base_URL}/uploads/${existingimage}`} alt=""
                />
                :
                <img className=' w-50  ms-3 rounded-pill' src={preview ? preview : "https://i.postimg.cc/vTX0T4sv/image.jpg"} alt=""
                />

}
              </label>
              <input onChange={(e) => setProfile({ ...profile, ['image']: e.target.files[0] })} id='imgj' type="file" style={{ display: 'none' }} />

                
              <div className='mt-5'>
                <input value={profile.user} onChange={(e) => setData(e)} name='user' id='ad' className='form-control' type="text" placeholder='User Name' />
                {unameValid && <p className='text-danger'>invalid Character</p>}
              </div>

              <div className='mt-3 mb-5'>
                <input className='form-control' value={profile.phone} onChange={(e) => setData(e)} name='phone' id='az' type="text" placeholder='Phone no' />
                {PhoneValid && <p className='text-danger'>invalid phone no</p>}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={(e) => handleUpdate(e)} variant="primary" >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>

        <ToastContainer />

      </div>

    </div>
  )
}

export default Profile