import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { dummyCourses } from '../assets/assets';
import { Form, useNavigate } from 'react-router-dom';
export const AppContext=createContext();
import humanizeDuration from 'humanize-duration';
import {useAuth, useUser} from '@clerk/clerk-react'



export const AppContextProvider=(props)=>{

    const currency=import.meta.env.VITE_CURRENCY
    const [allCourses, setAllCourses]=useState([]);
    const[isEducator, setIsEducator]=useState(true);
    const [enrolledCourses, setEnrolledCourses]=useState([]);
    const navigate=useNavigate();


    // generate tokens (to change role of user whereater 'educator'  or 'student')
    const {getToken}=useAuth();
    const {user}=useUser();


    


// fetch all courses
const fetchAllCourses=async () => {
    setAllCourses(dummyCourses);
    
}

//fetch user enrolled courses
const fetchUserEnrolledCourses=()=>{
    setEnrolledCourses(dummyCourses);
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

    return totalRating/course.courseRatings.length;
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


const logToken=async()=>{
    console.log(await getToken());
}


// get the user role and token  when ever user changes
useEffect(()=>{
    if(user)
    {
        logToken()
    }
},[user])


// call fetch all courses function
useEffect(()=>{fetchAllCourses(), fetchUserEnrolledCourses()},[])


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
        fetchUserEnrolledCourses
        

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
