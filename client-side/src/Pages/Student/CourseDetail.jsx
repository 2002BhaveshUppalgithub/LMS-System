import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import Loading from './Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../Components/Students/Footer';
import YouTube from 'react-youtube';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const { allCourses, calculateRating, courseDuartion, calculateChapterTime, calculateNoOfLectures, currency, backend_url, userData, getToken } = useContext(AppContext);
  const [isAlredyEnrolled, setAlredayEnrolled] = useState(true);
  const [playData, setPlayData] = useState(null);

  const findCourseData = async () => {
    try {
      const { data } = await axios.get(backend_url + '/api/course/' + id);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn('Login To Enroll');
      }
      if (isAlredyEnrolled) {
        return toast.warn('User Already Enrolled');
      }

      const token = await getToken();
      const { data } = await axios.post(backend_url + '/api/user/purchase', { courseId: courseData._id }, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    findCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setAlredayEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePreviewClick = (lectureUrl) => {
    const videoId = lectureUrl.split('/').pop(); // Extract video ID from the URL
    setPlayData({ videoId });
  };

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-6 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/50 to-white'></div>

        {/* LEFT SIDE */}
        <div className='max-w-2xl z-10 text-gray-800 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md'>
          <h1 className='text-4xl font-extrabold text-indigo-800 mb-4 leading-snug'>{courseData.courseTitle}</h1>

          <p className='pt-2 text-base leading-relaxed text-gray-700 font-medium' dangerouslySetInnerHTML={{
            __html: courseData?.courseDiscription
              ? courseData.courseDiscription.slice(0, 101) + '<br/>' + courseData.courseDiscription.slice(100, 200)
              : ''
          }}></p>

          <div className='flex items-center flex-wrap space-x-4 pt-4 pb-1 text-sm'>
            <div className='flex items-center gap-1'>
              <p>{calculateRating(courseData)}</p>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <img className='w-4 h-4' key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />
                ))}
              </div>
            </div>
            <p className='text-gray-500'>({courseData.courseRatings.length} rating{courseData.courseRatings.length > 1 && 's'})</p>
            <p className='text-gray-500'>{courseData.enrolledStudents.length} student{courseData.enrolledStudents.length > 1 && 's'} Enrolled</p>
          </div>

          <p className='text-sm'>Course By <span className='text-blue-600 font-medium underline'>{courseData.educator.name}</span></p>

          {/* Course Structure */}
          <div className='pt-8'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-4'>
              {courseData.courseContent.map((chapter, index) => (
                <div className='border border-gray-300 bg-white mb-3 rounded-xl shadow-sm' key={index}>
                  <div onClick={() => toggleSection(index)} className='flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-indigo-50 rounded-t-xl'>
                    <div className='flex items-center gap-2'>
                      <img src={assets.down_arrow_icon} className='w-4 h-4' />
                      <p className='font-medium text-sm md:text-base'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-blue-600 font-medium  text-sm text-gray-500'>{chapter.chapterContent.length} lecture - {calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection === index ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='list-disc pl-8 pr-4 py-2 text-sm text-gray-600 border-t border-gray-200'>
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className='flex items-start justify-between py-1'>
                          <div className='flex gap-2'>
                            <img src={assets.play_icon} className='w-4 h-4 mt-1' />
                            <span>{lecture.lectureTitle}</span>
                          </div>
                          <div className='flex gap-2 text-blue-600'>
                            {lecture.isPreviewFree && (
                              <span onClick={() => handlePreviewClick(lecture.lectureUrl)} className='cursor-pointer hover:underline'>
                                Preview
                              </span>
                            )}
                            <span className='text-gray-500'>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Description */}
          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3 whitespace-pre-line leading-relaxed text-gray-600' dangerouslySetInnerHTML={{
              __html: courseData?.courseDiscription
                ? courseData.courseDiscription.slice(0, 210) + '<br/>' + courseData.courseDiscription.slice(100, 200)
                : ''
            }}></p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="max-w-sm mb-10 sm:max-w-md bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl overflow-hidden border border-indigo-200">
          {playData
            ? <YouTube videoId={playData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video rounded-b-xl' />
            : <img className="w-full h-52 object-cover rounded-b-xl shadow-md" src={courseData.courseThumbnail} alt="Course Thumbnail" />}

          <div className="p-5">
            <p className="text-red-600 text-sm font-semibold bg-red-50 p-2 rounded-md inline-block mb-2">🔥 <strong>5 days</strong> left at this price!</p>
            <div className="flex items-center gap-3 pt-2">
              <p className="text-xl font-semibold text-gray-800">{currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}</p>
              <p className="text-gray-400 line-through">{currency} {courseData.coursePrice}</p>
              <p className='text-lg font-bold text-red-600'>{courseData.discount}% OFF</p>
            </div>
            <div className='flex items-center gap-3 mt-4 text-sm text-gray-600'>
              <div className='flex items-center gap-1'><img src={assets.star} className='w-4 h-4' /> {calculateRating(courseData)}</div>
              <div className='h-4 w-px bg-gray-300'></div>
              <div className='flex items-center gap-1'><img src={assets.time_clock_icon} className='w-4 h-4' /> {courseDuartion(courseData)}</div>
              <div className='h-4 w-px bg-gray-300'></div>
              <div className='flex items-center gap-1'><img src={assets.lesson_icon} className='w-4 h-4' /> {calculateNoOfLectures(courseData)} lessons</div>
            </div>
            <button onClick={enrollCourse} className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 scale-100 hover:scale-105">
              {isAlredyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className='mt-6'>
              <h4 className='text-lg font-semibold text-gray-700'>What's in the Course</h4>
              <ul className='mt-2 list-disc list-inside text-gray-700 text-sm space-y-1'>
                <li>🎓 Lifetime access with free updates</li>
                <li>🧑‍💻 Hands-on project guidance</li>
                <li>📦 Downloadable resources and source code</li>
                <li>📝 Quizzes to test your knowledge</li>
                <li>🏅 Certificate of Completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />;
};

export default CourseDetail;
