import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import SearchBar from '../../Components/Students/SearchBar';
import { useParams, useNavigate } from 'react-router-dom';
import CourseCard from '../../Components/Students/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../Components/Students/Footer';

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();

  // State to store filtered courses
  const [filteredCourses, setFilteredCourses] = useState(allCourses || []);

  // Filter courses when allCourses or input changes
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourses(tempCourses.filter(item =>
            item.courseTitle.toLowerCase().includes(input?.toLowerCase())
          ))
        : setFilteredCourses(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500">
              <span onClick={() => navigate("/")} className="text-blue-600 cursor-pointer">
                Home
              </span> 
              / Course List
            </p>
          </div>
          <SearchBar data={input} onChange={(e) => setFilteredCourses(e.target.value)} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600">
            <p>{input}</p>
            <img src={assets.cross_icon} className="cursor-pointer" onClick={() => navigate("/course-list")} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 py-5">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-4">No courses found.</p>
          )}
        </div>
      </div>
      <Footer className="mt-4 " />

    </>
  );
};

export default CourseList;
