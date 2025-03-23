import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import './App.css'
import Home from './Pages/Student/Home'
import CourseList from './Pages/Student/CourseList'
import CourseDetail from './Pages/Student/CourseDetail'
import MyEnrollment from './Pages/Student/MyEnrollment'
import Player from './Pages/Student/Player'
import Loading from './Pages/Student/Loading'
import Educator from './Pages/Educator/Educator'
import DashBoard from './Pages/Educator/DashBoard'
import AddCourse from './Pages/Educator/AddCourse'
import MyCourses from './Pages/Educator/MyCourses'
import StudentEnrolled from './Pages/Educator/StudentEnrolled'
import NavBar from './Components/Students/NavBar'

function App() {

  const isEducatorRoute=useMatch('/educator/*');


  return (
  <div className='text-default min-h-screen bg-white'>

   { !isEducatorRoute && <NavBar/>}

    <Routes>
      <Route path='/' element={<Home/>}/>  

       {/* display list of couses */}
      <Route path='/course-list' element={<CourseList/>}/> 

      {/* based on input display that particular couse */}
      <Route path='/course-list/:input' element={<CourseList/>}/> 

       {/* based on input display  couse details */}  
      <Route path='/course/:id' element={<CourseDetail/>}/>

       {/* display my enrolled  couses */}
      <Route path='/my-enrolments' element={<MyEnrollment/>}/> 

        {/* display particular  couses video */}
        <Route path='/player/:courseId' element={<Player/>}/> 

          {/* display paricular couses loading page */}
      <Route path='/loading/:path' element={<Loading/>}/> 



      {/* // routes for Educator */}
      <Route path='/educator' element={<Educator/>}>
          <Route path='educator' element={<DashBoard/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-course' element={<MyCourses/>}/>
          <Route path='student-enrolled' element={<StudentEnrolled/>}/>
      </Route>


    </Routes>
  </div>     
  )
}

export default App
