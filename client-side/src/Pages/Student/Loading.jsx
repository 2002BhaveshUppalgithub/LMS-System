import React from 'react'

const Loading = () => {
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
