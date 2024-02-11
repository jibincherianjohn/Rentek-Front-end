import { Base_URL } from "./base_url";
import { CommonApi } from "./commonReq";



// register

export const registerApi= async(body)=>{
 return await  CommonApi('POST',`${Base_URL}/users/register`,body,"")
}


// login
 export const loginApi=async (body)=>{
 return await  CommonApi('POST',`${Base_URL}/users/login`,body,"")
}

//  update-Profile

export const UpdateProfileApi=async (body,headers,id)=>{
    return await  CommonApi('PUT',`${Base_URL}/user/updaeprofile/${id}`,body,headers)
   }

//    add-project 
 export const AddprojectApi =async (body,headers)=>{
    return await CommonApi ('POST',`${Base_URL}/user/addproject`,body,headers)
 }

//  get userProprty

export const GetProjectApi =async(headers,id)=>{
   return await CommonApi ("GET",`${Base_URL}/user/getuserProject/${id}`,"",headers)
}

// get All project

export const GetAllprojectApi =async (SearchData)=>{
   return await CommonApi('GET',`${Base_URL}/user/allProject?search=${SearchData}`,"",{})
}

// get home display project(4)


export const GetLimtProApi= async()=>{
   return await CommonApi('GET',`${Base_URL}/user/threeproject`,"","")
}


// update project 

export const UpdateProjApi = async(body,headers,id)=>{
   return await CommonApi('PUT',`${Base_URL}/user/updateproject/${id}`,body,headers)
}

// remove Project


export const removeAPi =async(headers,id)=>{
   return await CommonApi('DELETE',`${Base_URL}/user/projectdelete/${id}`,{},headers)
}
   // detail view

   export const VieDeatailApi=async(headers,id)=>{
      return await CommonApi('GET',`${Base_URL}/user/singleview/${id}`,"",headers)
   }