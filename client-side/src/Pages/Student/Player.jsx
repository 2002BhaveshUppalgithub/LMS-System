import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../Components/Students/Footer';
import Rating from '../../Components/Students/Rating';

const Player = () => {
  const [courseData, setCourseData] = useState(null);
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [openSection, setOpenSection] = useState(null);
  const [playData, setPlayData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  // Toggle function for section dropdown
  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* Left Section */}
        <div className='text-gray-800'>
          <h1>Course Structure</h1>

          <div className='pt-5'>
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                  <div
                    onClick={() => toggleSection(index)}
                    className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                  >
                    <div className='flex items-center gap-2'>
                      <img src={assets.down_arrow_icon} alt="Expand" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>
                      {chapter.chapterContent.length} lecture - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${openSection === index ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <li className='flex items-start gap-2 py-1' key={lectureIndex}>
                          <img src={false ? assets.blue_tick_icon : assets.play_icon} className='w-4 h-4 mt-1' alt="Icon" />
                          <div className='flex items-center justify-between w-full text-gray text-xs md:text-default'>
                            <p className=''>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayData((prev) => ({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: lectureIndex + 1,
                                      forceUpdate: !prev?.forceUpdate, // Ensures re-render on same video click
                                    }))
                                  }
                                  className='text-blue-500 cursor-pointer'
                                >
                                  Watch
                                </p>
                              )}
                              <p className=''>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
          <div className='flex items-center gap-3 py-3 mt-10'>
          <h1 className='text-xl font-bold'>Rate this Course</h1>
          <Rating initialRating={0}/>

         
        </div>

        </div>



       



        {/* Right Section */}
        <div className='md:mt-10'>
          {playData ? (
            <YouTube videoId={playData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
          ) : (
            <div className='flex flex-col items-center'>
              <img src={courseData ? courseData.courseThumbnail : ''} alt='Course Thumbnail' />

              <button className='mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition'>
                {false ? 'Completed' : 'Mark Completed'}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Player;
