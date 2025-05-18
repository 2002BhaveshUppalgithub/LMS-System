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

  const [filteredCourses, setFilteredCourses] = useState(allCourses || []);

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
      <div className="relative md:px-36 px-8 pt-20 text-left bg-gray-50 min-h-screen">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full bg-white p-6 rounded-xl shadow-md">
          <div>
            <h1 className="text-4xl font-bold text-indigo-700">Course List</h1>
            <p className="text-gray-500 text-sm mt-1">
              <span onClick={() => navigate("/")} className="text-indigo-500 hover:underline cursor-pointer transition-all duration-300">
                Home
              </span>
              / Course List
            </p>
          </div>
          <SearchBar data={input} onChange={(e) => setFilteredCourses(e.target.value)} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-gray-100 rounded-full mt-8 mb-8 text-gray-600 shadow-sm">
            <p className="font-medium">{input}</p>
            <img src={assets.cross_icon} className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate("/course-list")} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 py-5">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-4 text-center italic mt-8">No courses found.</p>
          )}
        </div>
      </div>
      <Footer className="mt-12 bg-gray-50 py-6 shadow-inner" />
    </>
  );
};

export default CourseList;
