import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import Loading from './Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../Components/Students/Footer';
import YouTube from 'react-youtube';

const CourseDetail = () => {

  const {id}=useParams();
  const [courseData, setCourseData]=useState(null);
  const[openSection ,setOpenSection]=useState(null);
  const {allCourses,calculateRating,courseDuartion, calculateChapterTime,calculateNoOfLectures, currency}=useContext(AppContext);
  const[isAlredyEnrolled, setAlredayEnrolled]=useState(true);
  const [playData, setPlayData]=useState(null);

  const findCourseData=async()=>{

   const findCourse=  allCourses.find(course=>course._id===id)
     console.log(findCourse);
     setCourseData(findCourse);

  }

  useEffect(()=>{
    findCourseData()
  },[allCourses]);



  // toggle function on slick of arrow
  const toggleSection = (index) => {
    setOpenSection(prevIndex => (prevIndex === index ? null : index));
  };


 // if course data is not loaded display loading screen
  return courseData? (
    <>

    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

        {/* left column  */}
        <div className='max-w-xl z-10 text-gray-500'>
            <h1 className='text-2xl font-bold'>{courseData.courseTitle}</h1>
            <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 101) + '<br/>' + courseData.courseDescription.slice(100, 200)
            }}></p>


            {/* review and ratings */}

            <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
                      <p>{calculateRating(courseData)}</p>
                      <div className='flex'>
                        {[...Array(5)].map((_, i) => (
                          <img className='w-3.5 h-3.5' key={i} src={i<Math.floor(calculateRating(courseData))?assets.star:assets.star_blank} alt="" />
                        ))}
                      </div>
                      <p className='text-gray-500'>({courseData.courseRatings.length}{courseData.courseRatings.length>1?" ratings":" rating"})</p>
                      <p className='text-gray-500'>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length>1?" students":" student"} Enrolled</p>
              </div>

              <p className='text-sm'>Course By <span className='text-blue-500 underline'>Bhavesh Uppal</span></p>


              <div className='pt-8 text-gray-800'>
                <h1 className='text-xl font-semibold'>Course Structure</h1>

              <div className='pt-5'>
                {
                  courseData.courseContent.map((chapter,index)=>

                    <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                      <div onClick={()=>toggleSection(index)} className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>

                      <div className='flex items-center gap-2'>
                        <img src={assets.down_arrow_icon}/>
                        <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                      </div>
                      <p className='text-sm md:text-default'>{chapter.chapterContent.length} lecture - {calculateChapterTime(chapter)}</p>
                      </div>


                      <div className={`overflow-hidden transition-all duration-300 ${openSection === index ? 'max-h-96' : 'max-h-0'}`}>
                        <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                            {chapter.chapterContent.map((lecture, index) => (
                              <li className='flex items-start gap-2 py-1' key={index}>
                                <img src={assets.play_icon} className='w-4 h-4 mt-1'/>
                                <div className='flex items-center justify-between w-full text-gray text-xs md:text-deafult'>
                                  <p className=''>{lecture.lectureTitle}</p>
                                  <div className='flex gap-2'>
                                    {lecture.isPreviewFree && <p onClick={()=>setPlayData({
                                      videoId:lecture.lectureUrl.split('/').pop()
                                    })} className='text-blue-500 cursor-pointer'>Preview</p>}
                                    <p  className=''>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                      </div>
                    </div>
                  )
                }

              </div>
             </div>


             <div>
              <h3 className='text-xl font-semibold text-gray-500 pt-3'>Course Description</h3>
              <p className='pt-3  mb-6 whitespace-pre-line leading-relaxed text-gray-600' dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 210) + '<br/>' + courseData.courseDescription.slice(100, 200)
              }}></p>
            </div>

              




         </div>


      {/* right column */}
      <div className="max-w-sm sm:max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">

          {
            playData?   <YouTube videoId={playData.videoId} opts={{playerVars:{
              autoplay:1
            }} }  iframeClassName='w-full aspect-video'/>     

            : <img className="w-full h-40 sm:h-48 object-cover" 
            src={courseData.courseThumbnail} 
            alt="Course Thumbnail" />

          }

          
          <div className="p-4 flex items-center gap-2">
              <img className="w-4 h-4 sm:w-5 sm:h-5" 
                src={assets.time_left_clock_icon} 
                alt="Clock Icon" />
              <p className="text-red-500 text-sm sm:text-base">
              <span className="font-semibold">5 days</span> left at this price!
              </p>
        </div>

        <div className="pt-2 pl-4 flex gap-3 items-center">
          <p className="text-lg font-semibold text-gray-800">
            {currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
         </p>
         <p className="text-gray-500 line-through text-sm">
           {currency} {courseData.coursePrice}
        </p>
        <p className='text-lg font-semibold text-red-800'>{courseData.discount}%OFF</p>

       </div>


       {/* some tutorial details */}

      <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500 px-3 py-4'>

        <div className='flex items-center gp-1'>
          <img src={assets.star}/>
          <p>{ calculateRating(courseData)}</p>
        </div>

        <div className='h-4 w-px bg-gray-500/40'></div>

        <div className='flex items-center gp-1'>
          <img src={assets.time_clock_icon}/>
          <p>{ courseDuartion(courseData)}</p>
        </div>

        <div className='h-4 w-px bg-gray-500/40'></div>

        <div className='flex items-center gp-1'>
          <img src={assets.lesson_icon}/>
          <p >{ calculateNoOfLectures(courseData)} lessons</p>
        </div>

      </div>

      {/* enrolled button */}
      <div className="flex justify-center">
          <button className="ml-4 mr-4 cursor-pointer md:mt-6 mt-4 w-full py-3 px-6 rounded bg-blue-600 text-white font-medium">
         {isAlredyEnrolled ? "Already Enrolled" : "Enroll Now"}
        </button>
     </div>

       <div className='pt-6 pl-4 ' >
        <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the Course</p>
        <ul className='ml-4 pt-2 text-sm md:text-deafult list-disc text-gray-500'>
          <li className=''>Lifetime access with free updates.</li>
          <li>Step-by-Step, hands-on projects guidance.</li>
          <li>Dowmloaded resourses and source code.</li>
          <li>Quizzes to test your Knowledge.</li>
          <li>Certification of Completion.</li>
        </ul>
       </div>

    </div>
</div>

<Footer/>

 </> ): <Loading/>
}

export default CourseDetail
