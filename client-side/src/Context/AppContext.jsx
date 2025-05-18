import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { dummyCourses } from '../assets/assets';
import { Form, useNavigate } from 'react-router-dom';
export const AppContext=createContext();
import humanizeDuration from 'humanize-duration';
import {useAuth, useUser} from '@clerk/clerk-react'
import axios from 'axios';
import { toast } from 'react-toastify';




export const AppContextProvider=(props)=>{


    // import backend url
    const backend_url=import.meta.env.VITE_BACKEND_URL;

    const currency=import.meta.env.VITE_CURRENCY
    const [allCourses, setAllCourses]=useState([]);
    const[isEducator, setIsEducator]=useState(false);
    const [enrolledCourses, setEnrolledCourses]=useState([]);
    const [userData, setUserData]=useState(null);
    const navigate=useNavigate();


    // generate tokens (to change role of user whereater 'educator'  or 'student')
    const {getToken}=useAuth();
    const {user}=useUser();


    


// fetch all courses
const fetchAllCourses=async () => {
    try {
      const {data}=  await axios.get(backend_url+'/api/course/all');
      if(data.success)
      {
        setAllCourses(data.courses);

      }
      else{
        toast.error(data.message);

      }      
    } catch (error) {
        toast.error(error.message);    
    }    
}

// fetch user data
const fetchUserData=async () => {
    // check if user is educator or student 
    if(user.publicMetadata.role==='educator')
    {
        setIsEducator(true);
    }

    try {
        const token= await getToken();
      const {data}=  await axios.get(backend_url+'/api/user/data',{headers:{Authorization: `Bearer ${token}`}});
      if(data.success)
      {
         setUserData(data.user)
      }
      else{
        toast.error(data.message);
      }
        
    } catch (error) {
        toast.error(error.message);     
    }    
}

//fetch user enrolled courses
const fetchUserEnrolledCourses=async()=>{

    try {
        
        const token=await getToken();
        const {data}=await axios.get(backend_url+'/api/user/enrolled-courses', {headers:{Authorization: `Bearer ${token}`}})
        if(data.success)
        {
            setEnrolledCourses(data.enrolledCourses.reverse());
        }
        else{
            toast.error(data.message);
        }

        
    } catch (error) {
        toast.error(error.message);
        
    }
   
    
}


// function to calculate avg rating of course
const calculateRating=(course)=>{
    if(course.courseRatings.length===0)
    {
        return 0;
    }
    let totalRating=0;
    course.courseRatings.forEach(rating=>{
        totalRating+=rating.rating
    })

    return Math.floor(totalRating/course.courseRatings.length);
}


// function to calculate course chapter time
const calculateChapterTime=(chapter)=>{

    let time=0;
    chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration);
    return humanizeDuration(time*60*1000,{units:["h","m"]});

}


// function to calculate course duration
const courseDuartion=(course)=>{

    let time=0;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
    return humanizeDuration(time*60*1000,{units:["h","m"]});

}

// function to calulate no of lectures in the course
const calculateNoOfLectures=(course)=>{
    let totalLectures=0;

    course.courseContent.forEach(chapter=>{
        if(Array.isArray(chapter.chapterContent))
        {
            totalLectures+=chapter.chapterContent.length
        }
    });

    return totalLectures;

}

// get the user role and token  when ever user changes and fetch all userdata and all its enrolledcourses
useEffect(()=>{
    if(user)
    {
        fetchUserData(),
        fetchUserEnrolledCourses()
    }
},[user])


// call fetch all courses function
useEffect(()=>{fetchAllCourses()},[])


    const value={
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,setIsEducator,
        calculateChapterTime,
        calculateNoOfLectures,
        courseDuartion,
        enrolledCourses,
        setEnrolledCourses,
        fetchUserEnrolledCourses,
        backend_url,userData, setUserData,getToken, fetchAllCourses
        

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
