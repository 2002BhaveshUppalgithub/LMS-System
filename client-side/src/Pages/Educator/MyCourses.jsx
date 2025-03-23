import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Students/Loading';

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchAllEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchAllEducatorCourses();
  }, []);

  return courses ? (
    <div className='w-full max-w-5xl mx-auto p-4'>
      {/* My Courses Section */}
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-gray-700 mb-4'>My Courses</h1>
      </div>

      {/* All Courses Table */}
      <div className='w-full mt-6'>
        <h1 className='text-xl font-semibold text-gray-700 mb-4'>All Courses</h1>
        <div className='overflow-x-auto bg-white shadow-lg rounded-lg'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-blue-500 text-white'>
                <th className='border border-gray-300 px-4 py-2'>Course Name</th>
                <th className='border border-gray-300 px-4 py-2'>Earnings</th>
                <th className='border border-gray-300 px-4 py-2'>Students</th>
                <th className='border border-gray-300 px-4 py-2'>Published On</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
                  {courses.map((course) => (
                    <tr key={course._id} className="border-b border-gray-500/20">
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <img src={course.courseThumbnail} alt="Course Image" className="w-16" />
                        <span className="truncate hidden md:block">{course.courseTitle}</span>
                      </td>
                      <td className="px-4 py-3">
                        {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                      </td>
                      <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                      <td className="px-4 py-3">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;


// get all the corses of that particular educator