import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddprojectApi } from '../Service/allApi';
import { addResponseContext } from '../Context-api/ContextShare';



function AddProject() {
    //    use context
    const {setAddupdate} = useContext(addResponseContext)


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [token, setToken] = useState('')

    const [preview, setpreview] = useState('')

    const [existingImage, setExistingImage] = useState("")

    const [project, setProject] = useState({
        title: "", address: "", description: "", amount: "", Phones: "", projectImage: ""
    })

    const setData = (e) => {

        const { value, name } = e.target
        setProject({ ...project, [name]: value })
    }
    console.log(project);


    useEffect(() => {
        if (project.projectImage) {
            setpreview(URL.createObjectURL(project.projectImage))
        }
        else {
            setpreview("")
        }
    }, [project.projectImage])

    useEffect(() => {

        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
        else {
            setToken("")
        }

    }, [])

    console.log(token);

    const handleAdd = async (e) => {
        e.preventDefault()
        const { title, address, description, amount, Phones, projectImage } = project
        if (!title || !address || !description || !amount || !Phones || !projectImage) {
            alert('please fill the data')
        }
        else {

            //headers

            const reqHeaderCon = {
                "Content-Type": "multipart/form-data",
                "access_token": `Bearer ${token}`
            }
            console.log(reqHeaderCon);

            //    body

            const reqBodycon = new FormData()

            reqBodycon.append('title', title)
            reqBodycon.append('address', address)
            reqBodycon.append('description', description)
            reqBodycon.append('amount', amount)
            reqBodycon.append('Phones', Phones)
            reqBodycon.append('projectImage', projectImage)

            const result = await AddprojectApi(reqBodycon, reqHeaderCon)

            if (result.status == 200) {
                console.log(result);
                toast.success('property add SuccessFully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProject({ ...project, title: "", address: "", description: "", amount: "", Phones: "", projectImage: "" })
                // change context state

                setAddupdate(result.data)

                handleClose()
            }
            else {
                toast.error(`failed${result.response.data}`, {
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

    return (
        <div>


            <Row className='w-100'>

                <Col lg={12} >
                    <Link to={''} onClick={handleShow} style={{ textDecoration: 'none' }} className='btn btn-danger w-100 rouned'>Add Projects</Link>
                </Col>


            </Row>
            <Modal show={show}
                onHide={handleClose}
                size='lg'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title><h3 className='text-danger'>Add Rental Details</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col >
                            <label htmlFor='img1' className='text-center' >
                                <input onChange={(e) => setProject({ ...project, ["projectImage"]: e.target.files[0] })} name='projectImage' id='img1' style={{ display: 'none' }} type="file" />
                                <img className=' w-100 ' src={preview ? preview : "https://i.postimg.cc/vTX0T4sv/image.jpg"} alt="" />

                            </label>

                        </Col>

                        <Col >
                            <input type="text" placeholder='property name' value={project.title} name='title' onChange={(e) => setData(e)} className='form-contol' style={{ border: 'none' }} />
                            <hr className='' />
                            <input type="text" placeholder='Amount' value={project.amount} name='amount' onChange={(e) => setData(e)} className='form-contol' style={{ border: 'none' }} />
                            <hr className='' />
                            <textarea value={project.description} placeholder='Descrption' name='description' onChange={(e) => setData(e)} id="" style={{ border: 'none' }} className=''></textarea>
                            <hr />
                            <input type="text" value={project.Phones} placeholder='Phone no' name='Phones' onChange={(e) => setData(e)} className='form-contol' style={{ border: 'none' }} />
                            <hr className='' />
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                            <textarea value={project.address} name='address' onChange={(e) => setData(e)} id="" style={{ border: 'none' }} placeholder='Address' className=''></textarea>

                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={(e) => { handleAdd(e) }} variant="primary" >
                        Save Change
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    )
}
export default AddProject