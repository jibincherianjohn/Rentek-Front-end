import React, { useEffect, useState } from 'react'
import {Button, Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { GetAllprojectApi } from '../Service/allApi'
import Form from 'react-bootstrap/Form';

function ProjectView() {


const [allProjk,setallProjk]=useState([])

const[SearchData,setSearchData]=useState("")

const getallprojects=async()=>{
    const result = await GetAllprojectApi(SearchData)

    console.log(result);
    setallProjk(result.data)
}

useEffect(()=>{

    getallprojects()
},[SearchData])
console.log(allProjk);
console.log(SearchData );

  return (
    <div>


            <h4 className='text-center font-semibold text-warning p-3'>Explore Your Dream Here..!</h4>

            <Row className='border rounded p-3 w-100' >
                <div className='flex justify-center p-6 mb-3'>
                    
                        <Row>
                            <Col className='flex' xs="auto">
                                <Form.Control
                                onChange={(e)=>setSearchData(e.target.value)}
                                    type="text"
                                    placeholder="Search by location!"
                                    className="w-100 mr-lg-2 "
                                />
                                <Button className='ms-2' variant='outline-warning' type="submit"><i class="fa-solid fa-magnifying-glass"></i></Button>
                            </Col>

                        </Row>
                    
                </div>
                {allProjk?.length > 0 ? allProjk.map(i => (
                    <Col className='p-3' lg={3} md={12}>
                       <ProjectCard projecty={i}></ProjectCard>
                    </Col>
                )) :
                    <div className='w-100 bg-dark h-full mb-80 mt-24'>
                        <div class="ring">Acres
                            <span className='s1'></span>
                        </div>
                    </div>
                }
            </Row>
    </div>
  )
}

export default ProjectView