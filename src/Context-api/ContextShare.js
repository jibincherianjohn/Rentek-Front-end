import React, { createContext, useContext, useState } from 'react'


export const addResponseContext =createContext()
export const editResponseContext =createContext()
export const viewResponseContext =createContext()
export const profileResponseContext =createContext()

function ContextShare({children}) {
 const [addUpdate,setAddupdate]=useState([])
 const [editUpdate,setEditupdate]=useState([])
 const [viewUpdate,setViewupdate]=useState([])
 const [profileUpdate,setProfileupdate]=useState([])



  return (
    <>
<addResponseContext.Provider value={{addUpdate,setAddupdate}}>
<editResponseContext.Provider value={{editUpdate,setEditupdate}}>
    <viewResponseContext.Provider value={{viewUpdate,setViewupdate}}>
        <profileResponseContext.Provider value={{profileUpdate,setProfileupdate}}>
          
                    {children}
          
        </profileResponseContext.Provider>
    </viewResponseContext.Provider>
</editResponseContext.Provider>
</addResponseContext.Provider>
    </>
  )
}

export default ContextShare