import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../Components/Students/Footer';
import Rating from '../../Components/Students/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Components/Students/Loading';

const Player = () => {
  const [courseData, setCourseData] = useState(null);
  const { enrolledCourses, calculateChapterTime, userData, getToken, backend_url, fetchUserEnrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();
  const [openSection, setOpenSection] = useState(null);
  const [playData, setPlayData] = useState(null);

  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(backend_url + '/api/user/update-course-progress', { courseId, lectureId }, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(backend_url + '/api/user/get-course-progress', { courseId }, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlerating = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backend_url + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Left Section */}
        <div className="text-gray-800 md:pr-10">
          <h1 className="text-2xl font-semibold mb-6">Course Structure</h1>

          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div className="border border-gray-300 bg-white mb-4 rounded-lg shadow-sm" key={index}>
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <img src={assets.down_arrow_icon} alt="Expand" className="w-3 h-3" />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lecture - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${openSection === index ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="list-disc md:pl-8 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <li className="flex items-start gap-2 py-1" key={lectureIndex}>
                          <img
                            src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon}
                            className="w-4 h-4 mt-1"
                            alt="Icon"
                          />
                          <div className="flex items-center justify-between w-full text-gray text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayData((prev) => ({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: lectureIndex + 1,
                                      forceUpdate: !prev?.forceUpdate, 
                                    }))
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Watch
                                </p>
                              )}
                              <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-3 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course</h1>
            <Rating initialRating={initialRating} onRate={handlerating} />
          </div>
        </div>

        {/* Right Section (Image and Video Player) */}
        <div className="md:mt-10 flex flex-col items-center">
          {playData ? (
            <div className="w-full">
              <YouTube videoId={playData.lectureUrl.split('/').pop()} iframeClassName="w-full aspect-video" />

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold">{playData.chapter}. {playData.lecture} {playData.lectureTitle}</p>
                <button
                  onClick={() => markLectureAsCompleted(playData.lectureId)}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                >
                  {progressData && progressData.lectureCompleted.includes(playData.lectureId) ? 'Completed' : 'Mark Completed'}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="rounded-lg shadow-lg max-w-[70%] mx-auto" />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Player;
