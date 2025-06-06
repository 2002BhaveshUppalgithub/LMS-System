import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

    const navigate=useNavigate();
    const[input,setInput]=useState(data? data:'');

    const onSearchHandler=(e)=>{
        e.preventDefault();
        navigate('/course-list/'+input);

    }


  return (
  
        <form onSubmit={onSearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
            <img src={assets.search_icon} className='md:w-auto w-10 px-3'/>
            <input onChange={e=>setInput(e.target.value)} value={input}
             type='text' placeholder='search for courses' className='w-full h-full outline-none text-gray-500/80'/>
            <button  className='px-4 mr-3 mb-2 mt-2 py-2 text-sm md:text-base lg:text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300' type='submit'>Search</button>
        </form>
   
  )
}

export default SearchBar
