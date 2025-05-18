import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {

  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => { scrollTo(0, 0) }}
      className='border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-xl overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]'
    >

      <img
        src={course.courseThumbnail}
        alt=''
        className='w-full h-52 object-cover transition-transform duration-300 hover:scale-105'
      />

      <div className='p-4 text-left space-y-2'>

        <h3 className='text-lg font-semibold text-gray-800 line-clamp-2'>
          {course.courseTitle}
        </h3>

        <p className='text-sm text-gray-500'>{course.educator.name}</p>

        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium text-yellow-600'>{calculateRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img
                className='w-4 h-4'
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt=""
              />
            ))}
          </div>
          <p className='text-sm text-gray-500'>({course.courseRatings.length})</p>
        </div>

        <p className='text-base font-bold text-gray-900'>
          {currency}{(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>

      </div>

    </Link>
  )
}

export default CourseCard
