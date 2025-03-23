import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import CourseCard from './CourseCard';

const CoursesSection = () => {
    // get allcourses from context provider
    const {allCourses}=useContext(AppContext);

  return (
    <div className='w-full text-center mt-12 px-6 md:px-0'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Learn from the best</h2>
            <p className='text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-3 md:whitespace-normal md:overflow-visible md:text-center'>
                Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
            </p>



         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:my-16 my-10'>
            {allCourses.slice(0, 4).map((course, index) => (
                <CourseCard key={index} course={course} />
            ))}
         </div>




            <Link to={'/course-list'} onClick={() => scrollTo(0,0)} 
                className='mt-5 inline-block px-5 py-2 text-sm md:text-base font-semibold text-black border border-gray-400 rounded-lg hover:bg-gray-100 transition duration-300'>
                Show all courses
            </Link>
    </div>

  )
}

export default CoursesSection
