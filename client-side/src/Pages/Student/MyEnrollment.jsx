import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import {Line} from 'rc-progress';
import Footer from '../../Components/Students/Footer';

const MyEnrollment = () => {

  const {enrolledCourses,courseDuartion, navigate}=useContext(AppContext);

  // add progress bar 
  const [progressArray, setProgressArray]=useState([
    {lectureCompleted:0, totalLectures:4},
    {lectureCompleted:1, totalLectures:5},
    {lectureCompleted:4, totalLectures:4},
    {lectureCompleted:5, totalLectures:10},
    {lectureCompleted:1, totalLectures:4},
    {lectureCompleted:1, totalLectures:4},
    {lectureCompleted:3, totalLectures:4},
    {lectureCompleted:2, totalLectures:7}
  ])



  return (
    
<>

<div className='md:px-36 px-4 pt-10 mb-6'>
  <h1 className='text-xl md:text-2xl font-bold mb-6 text-gray-800'>My Enrollments</h1>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse min-w-[600px] md:min-w-full">
      <thead className="hidden md:table-header-group">
        <tr className="bg-gray-100">
          <th className='px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700'>Course</th>
          <th className='px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700'>Duration</th>
          <th className='px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700'>Completed</th>
          <th className='px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700'>Status</th>
        </tr>
      </thead>

      <tbody>
        {enrolledCourses.map((course, index) => (
          <tr key={index} className="border-b hover:bg-gray-50 flex flex-col md:table-row">
            <td className="flex md:table-cell flex-col md:flex-row items-start md:items-center gap-2 px-3 py-2 md:px-4 md:py-3">
              <img className='w-20 md:w-28 rounded-md' src={course.courseThumbnail} alt="Course" />
              <div className='flex-1'>
                  <p className="text-gray-800 font-medium text-sm md:text-base">{course.courseTitle}</p>
                  
              </div>

              <Line
              strokeWidth={2}
              percent={progressArray[index].totalLectures > 0 ? (progressArray[index].lectureCompleted / progressArray[index].totalLectures) * 100 : 0}
              strokeColor={progressArray[index].lectureCompleted === 0 ? "#d1d5db" : "#3b82f6"} // Gray if 0 lectures completed
              trailColor="#e5e7eb"
              className="rounded-full"
             />
             
            </td>
      
           


         



            {/* Show duration, completed, and status data but hide headings on mobile */}
            <td className="px-3 py-2 md:px-4 md:py-3 text-gray-600 text-sm md:text-base before:content-['Duration:'] before:font-semibold before:mr-1 md:before:content-none">
              {courseDuartion(course)}
            </td>

            <td className="px-3 py-2 md:px-4 md:py-3 text-gray-600 text-sm md:text-base before:content-['Completed:'] before:font-semibold before:mr-1 md:before:content-none">
            {progressArray[index] && `${progressArray[index].lectureCompleted}/ ${progressArray[index].totalLectures} `} <span className='text-gray-500'>Lectures</span>
            </td>

            <td className="px-3 py-2 md:px-4 md:py-3 before:content-['Status:'] before:font-semibold before:mr-1 md:before:content-none">
              <button onClick={()=> navigate('/player/'+course._id)} className="bg-blue-600 text-white cursor-pointer py-2 px-3 md:px-4 rounded-md hover:bg-blue-700 transition text-sm md:text-base">
               {progressArray[index].lectureCompleted===progressArray[index].totalLectures ? 'Completed':'On Going'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div >

<Footer/>
  </>

  )
}

export default MyEnrollment
