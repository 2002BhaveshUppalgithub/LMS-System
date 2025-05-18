import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../Components/Students/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyEnrollment = () => {
  const {
    enrolledCourses,
    courseDuartion,
    navigate,
    userData,
    fetchUserEnrolledCourses,
    backend_url,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            const { data } = await axios.post(
              `${backend_url}/api/user/get-course-progress`,
              { courseId: course._id },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const totalLectures = calculateNoOfLectures(course);
            const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;

            return { totalLectures, lectureCompleted };
          } catch (error) {
            console.log(error);
            return { totalLectures: 0, lectureCompleted: 0 };
          }
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  return (
    <>
      <div className="md:px-36 px-4 pt-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-blue-700 border-b pb-2 border-blue-200">
          📘 My Enrollments
        </h1>

        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          <table className="w-full border-collapse min-w-[600px] md:min-w-full">
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-100">
                <th className="px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700">Course</th>
                <th className="px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700">Duration</th>
                <th className="px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700">Completed</th>
                <th className="px-3 py-2 md:px-4 md:py-3 font-semibold text-left text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody>
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index] || { totalLectures: 0, lectureCompleted: 0 };
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition-all duration-200 ease-in-out shadow-sm md:shadow-none flex flex-col md:table-row bg-white rounded-xl md:rounded-none md:mb-0 mb-4 p-4 md:p-0"
                  >
                    <td className="flex flex-col md:flex-row md:items-center gap-3 px-3 py-2 md:px-4 md:py-3">
                      <img
                        className="w-20 md:w-28 rounded-md transform transition-transform duration-300 hover:scale-105 shadow"
                        src={course.courseThumbnail}
                        alt="Course"
                      />

                      <div className="flex flex-col md:flex-row md:justify-between w-full">
                        <div className="mb-2 md:mb-0">
                          <p className="text-gray-800 font-medium text-sm md:text-base">{course.courseTitle}</p>
                        </div>

                        <div className="flex flex-col justify-center md:items-end w-full md:w-48 mt-2 md:mt-0">
                          <Line
                            strokeWidth={4}
                            style={{ height: '8px', borderRadius: '9999px', width: '100%' }}
                            percent={
                              progress.totalLectures > 0
                                ? (progress.lectureCompleted / progress.totalLectures) * 100
                                : 0
                            }
                            strokeColor={progress.lectureCompleted === 0 ? '#d1d5db' : '#3b82f6'}
                            trailColor="#e5e7eb"
                          />
                          <span className="text-xs text-gray-500 mt-1">
                            {progress.lectureCompleted} / {progress.totalLectures} Lectures
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-2 md:px-4 md:py-3 text-gray-600 text-sm md:text-base before:content-['Duration:'] before:font-semibold before:mr-1 md:before:content-none">
                      {courseDuartion(course)}
                    </td>

                    <td className="px-3 py-2 md:px-4 md:py-3 text-gray-600 text-sm md:text-base before:content-['Completed:'] before:font-semibold before:mr-1 md:before:content-none">
                      {`${progress.lectureCompleted} / ${progress.totalLectures}`} <span className="text-gray-500">Lectures</span>
                    </td>

                    <td className="px-3 py-2 md:px-4 md:py-3 before:content-['Status:'] before:font-semibold before:mr-1 md:before:content-none">
                      <button
                        onClick={() => navigate('/player/' + course._id)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold cursor-pointer py-2 px-3 md:px-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm md:text-base"
                      >
                        {progress.lectureCompleted === progress.totalLectures ? 'Completed' : 'On Going'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollment;
