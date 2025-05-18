import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Students/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyCourses = () => {
  const { currency, getToken, backend_url, isEducator } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchAllEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backend_url + '/api/educator/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });

      data.success && setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchAllEducatorCourses();
    }
  }, [isEducator]);

  return courses ? (
    <div className='w-full max-w-6xl mx-auto p-4 bg-gray-50'>
      {/* My Courses Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-4'>My Courses</h1>
      </div>

      {/* All Courses Table */}
      <div className='w-full mt-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>All Courses</h2>
        <div className='overflow-x-auto bg-white shadow-xl rounded-lg'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-blue-600 text-white'>
                <th className='border border-gray-300 px-6 py-3 text-left'>Course Name</th>
                <th className='border border-gray-300 px-6 py-3 text-left'>Earnings</th>
                <th className='border border-gray-300 px-6 py-3 text-left'>Students</th>
                <th className='border border-gray-300 px-6 py-3 text-left'>Published On</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className='border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200'
                >
                  <td className='md:px-6 pl-4 py-4 flex items-center space-x-4'>
                    <img
                      src={course.courseThumbnail}
                      alt="Course Image"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className='truncate md:block text-gray-800'>{course.courseTitle}</span>
                  </td>
                  <td className='px-6 py-4 text-gray-700'>
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className='px-6 py-4 text-gray-700'>{course.enrolledStudents.length}</td>
                  <td className='px-6 py-4 text-gray-500'>
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
