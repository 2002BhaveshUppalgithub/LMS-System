import React, { useContext, useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Students/Loading';

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = useContext(AppContext);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => { fetchDashboardData(); }, []);

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-center md:p-8 p-4'>
      {/* Top 3 Blocks Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl'>
        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 rounded-md bg-white'>
          <img src={assets.patients_icon} alt="Enrollments Icon"/>
          <div>
            <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-base text-gray-600'>Total Enrollments</p>
          </div>
        </div>

        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 rounded-md bg-white'>
          <img src={assets.appointments_icon} alt="Courses Icon"/>
          <div>
            <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
            <p className='text-base text-gray-600'>Total Courses</p>
          </div>
        </div>

        <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 rounded-md bg-white'>
          <img src={assets.earning_icon} alt="Earnings Icon"/>
          <div>
            <p className='text-2xl font-medium text-gray-600'>{currency} {dashboardData.totalEarnings}</p>
            <p className='text-base text-gray-600'>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Enrollments Table */}
      <div className="w-full max-w-5xl mt-10">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">Latest Enrollments</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Student Image</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Course Name</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="text-center border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={item.student.imageUrl} alt={item.student.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  ) : <Loading />;
};

export default DashBoard;
