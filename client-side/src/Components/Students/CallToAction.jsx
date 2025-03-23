import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 my-1">
  <div className="text-center px-6 md:px-12">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
      Learn anything, anytime, anywhere
    </h1>
    <p className="text-gray-600 mt-3 text-sm md:text-base">
      Expand your knowledge with the best courses available online.
    </p>

    <div className="mt-6 flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
        Get Started
      </button>
      <button className="flex items-center gap-2 border border-gray-400 px-6 py-2 rounded-lg text-gray-800 hover:bg-gray-200 transition duration-300">
        Learn More 
        <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
      </button>
    </div>
  </div>
</div>

  
  
  
  )
}

export default CallToAction
