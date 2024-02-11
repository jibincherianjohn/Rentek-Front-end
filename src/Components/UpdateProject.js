import React, { useContext, useEffect } from 'react'
import { Eye } from 'react-feather'
import { Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import { Base_URL } from '../Service/base_url';
import { UpdateProjApi } from '../Service/allApi';
import { editResponseContext } from '../Context-api/ContextShare';


function UpdateProject({ project }) {

    const{ setEditupdate }= useContext(editResponseContext)
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)
    const [preview, setpreview] = useState('')

    const [projects, setProjects] = useState({
        title: project.title, address: project.address, description: project.description, amount: project.amount, Phones: project.Phones,

        projectImage: ""

    })

    useEffect(() => {
        if (projects.projectImage) {
            setpreview(URL.createObjectURL(projects.projectImage))
        }
        else {
            setpreview("")
        }


    }, [projects.projectImage])

    const handleUpdate = async (e) => {
        e.preventDefault()

        const { title, address, description, amount, Phones, projectImage } = projects

        if (!title || !address || !description || !amount || !Phones) {
            alert('please fill the data')
        }
        else {

            // token
            const token = localStorage.getItem('token')

            // api call

            // reqBody
            const reqbodyCon = new FormData()

            reqbodyCon.append('title', title)
            reqbodyCon.append('address', address)
            reqbodyCon.append('description', description)
            reqbodyCon.append('amount', amount)
            reqbodyCon.append('Phones', Phones)
            preview ? reqbodyCon.append('projectImage', projectImage)
                : reqbodyCon.append('projectImage', project.projectImage)


            //  header

            if (preview) {

                var reqheadercond = {

                    "Content-Type": "multipart/form-data",
                    "access_token": `Bearer ${token}`

                }

            }
            else {

                var reqHeaderCon = {

                    "Content-Type": "application/json",
                    "access_token": `Bearer ${token}`
                }
            }
            console.log(reqHeaderCon);
            const poId = project._id


            const result = await UpdateProjApi(reqbodyCon, reqHeaderCon, poId)
            if (result.status == 200) {
                toast.success(`${result.data.title}Updated`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                //  update conetext\
                
                setEditupdate(result.data)
                handleClose()
            }
            else {
                alert(result.response.data)
            }

        }




    }

    console.log(projects);



    return (
        <div> <Button onClick={handleShow} className='text-end border-start border-end mb-3 px-3'><Eye size={44}></Eye> </Button>

            <Modal show={show}
                onHide={handleClose}
                size='lg'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title><h3 className='text-danger'>Update Project Details</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col >
                            <label htmlFor='img1' className='text-center' >
                                <input onChange={(e) => setProjects({ ...projects, ['projectImage']: e.target.files[0] })} id='img1' style={{ display: 'none' }} type="file" />
                                <img className=' w-100 ' src={preview ? preview : `${Base_URL}/uploads/${project.projectImage}`} alt="" />

                            </label>

                        </Col>

                        <Col >
                            <input type="text" placeholder='property name' onChange={(e) => setProjects({ ...projects, ['title']: e.target.value })} value={projects.title} name='title' className='form-contol' style={{ border: 'none' }} />
                            <hr className='' />
                            <input type="text" placeholder='Amount' onChange={(e) => setProjects({ ...projects, ['amount']: e.target.value })} value={projects.amount} name='amount' className='form-contol' style={{ border: 'none' }} />
                            <hr className='' />
                            <textarea onChange={(e) => setProjects({ ...projects, ['description']: e.target.value })} value={projects.description} placeholder='Descrption' name='description' id="" style={{ border: 'none' }} className=''></textarea>
                            <hr />
                            <input type="text" onChange={(e) => setProjects({ ...projects, ['Phones']: e.target.value })} value={projects.Phones} placeholder='Phone no' name='Phones' className='form-contol' style={{ border: 'none' }} />
                            <hr className='' />
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                            <textarea onChange={(e) => setProjects({ ...projects, ['address']: e.target.value })} value={projects.address} name='address' id="" style={{ border: 'none' }} placeholder='Address' className=''></textarea>

                        </Col>

                    </Row>
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




            <ToastContainer />
        </div>
    )
}

export default UpdateProject