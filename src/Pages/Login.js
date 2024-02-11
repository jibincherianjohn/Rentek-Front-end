import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { loginApi, registerApi } from '../Service/allApi';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Login({register}) {

    const navigate=useNavigate()


// state to check validation
const [unameValid,setUnameValid]=useState(false)
const [emailValid,setEmailValid]=useState(false)
const [passValid,setPassValid]=useState(false)



    const [user,setUser]=useState({

     username:"",email:"",password:""
    })

    const setInputs=(e)=>{
        const {name,value}=e.target 
          
            
        if(name=="username"){

            if(value.match(/^[a-zA-Z ]+$/)){

                setUnameValid(false)
              
            }
            else{
                      setUnameValid(true)
            }

         }
         if(name=="email"){

            if(value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){

                setEmailValid(false)
            
            }
            else{
                      setEmailValid(true)
            }

         }
         if(name=="password"){

            if(value.match(/^[0-9A-za-z]{2,8}$/)){

                setPassValid(false)
              
            }
            else{
                      setPassValid(true)
            }

         }
        //  store data after valdation

        setUser({...user,[name]:value})
    }
console.log(user);


    const handleRegister= async(e)=>{
        e.preventDefault()
        const{username,email,password}=user
        if(!username||!email||!password){
            
            toast.error('please fill the data', {
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
        else{
            const result= await registerApi(user)
            if(result.status==200){
             
                toast.success('Register SuccessFully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
           
                setUser({username:"",email:"",password:""})
                 
                 navigate('/login')
                
            }
            else{
             
                toast.error(`${result.response.data}`, {
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

    }

    const handleLogin= async(e)=>{
        e.preventDefault()
        const{username,email,password}=user
        if(!email||!password){

            toast.error('please fill the data', {
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
        else{
            const result= await loginApi(user)
            if(result.status==200){

      
                 // storing data in loaclstorage
                 localStorage.setItem('token',result.data.token)
                localStorage.setItem('currentuser',JSON.stringify(result.data.user));
                 localStorage.setItem('currentId',result.data.user._id)
                

                toast.success('Login SuccessFully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
             setUser({username:"", email:"", password:""})
                 
                 navigate('/')
                
            }
            else{
            

                toast.error(`${result.response.data}`, {
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

    }


const Loginform= register? true:false


  return (
    <div>
   <div className='w-75 container bg-light shadow mb-4 mt-5 p-5'>

<Row className='w-100'>
    <Col>
        <Link className='p-3 fs-3' to={'/'} style={{ textDecoration: "none" }}><i class="fa-solid fa-circle-left fa-4xl"></i>Back to home </Link>

        <img className='w-100 mt-1 mb-4 ' style={{ height: '90%' }} src={Loginform ? 'https://i.postimg.cc/hj8jcfvt/hr-Mdhw3fl-V.gif' : 'https://i.postimg.cc/85TGdwkT/login.gif'} alt="" />


    </Col>

    <Col className='p-3'>
        <h1 className=' text-center'>
            {
                Loginform ? 'Sign Up' : 'Sign In'

            }


        </h1>


        <div className='mt-5'>

            {
                Loginform &&
                <>
                    
                    <FloatingLabel controlId="floatingPassword" label="User Name" className='mb-3'>
                        <Form.Control value={user.username} onChange={(e)=>setInputs(e)}  name='username' id='ll' type="text"  placeholder="User Name" />
                    </FloatingLabel>
                   {unameValid && <p className='text-danger'>includes characters only</p>}
                </>
            }

            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control value={user.email} onChange={(e)=>setInputs(e)}  name='email' id='aa' type="email" placeholder="name@example.com" />
            </FloatingLabel>
            {emailValid&& <p className='text-danger'>invalid Email</p>}
          
            <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>
                <Form.Control value={user.password}  onChange={(e)=>setInputs(e)}  name='password' id='ax'  type="password" placeholder="Password" />
            </FloatingLabel> 
          {passValid&& <p className='text-danger'>invalid password</p>}
            <div className='text-center mt-5'>

                {
                    Loginform?
                        <Button onClick={e=>handleRegister(e)} className='btn btn-danger rounded-pill px-4 py-2 '>Register</Button>
                        :
                      <Button  onClick={e=>handleLogin(e)} className='btn btn-danger rounded-pill px-4 py-2 '>Login </Button>
                }

               <div className='mt-3'>
                    {
                        Loginform?
                        <p className=''> Already Have An Account?<Link to={'/login'} style={{textDecoration:'none'}}>Login Here</Link></p>
                        :
                        <p className=''> New User?<Link to={'/register'} style={{textDecoration:'none'}}>Sign Up Here</Link></p>
                    }

               </div>
            </div>
        </div>

    </Col>
</Row>
</div>
<ToastContainer />   
    </div>
  )
}

export default Login