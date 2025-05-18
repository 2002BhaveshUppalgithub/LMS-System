import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

    // loading add for payment gatway
    const {path}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
      if(path)
      {
        const timer=setTimeout(()=>navigate(`/${path}`),5000);
        return ()=>clearTimeout(timer);
      }
    },[])


  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <h1 className="mt-4 text-lg font-semibold text-gray-700">Loading...</h1>
      </div>
    </div>

  )
}

export default Loading
