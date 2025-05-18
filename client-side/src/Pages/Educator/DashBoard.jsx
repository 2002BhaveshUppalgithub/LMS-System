import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Students/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null); // Start with null
  const { currency, getToken, backend_url, isEducator } = useContext(AppContext);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backend_url + '/api/educator/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData); // Set data after successful fetch
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);

  if (!dashboardData) {
    return <Loading />; // Show loading while data is being fetched
  }

  return (
    <div className="min-h-screen flex flex-col items-center md:p-8 p-4 bg-gray-100">
      {/* Top 3 Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Total Enrollments */}
        <div className="flex items-center gap-4 shadow-lg p-5 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100">
          <img src={assets.patients_icon} alt="Enrollments Icon" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-semibold text-gray-700">{dashboardData.enrolledStudentsData.length}</p>
            <p className="text-lg text-gray-500">Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="flex items-center gap-4 shadow-lg p-5 rounded-lg bg-gradient-to-r from-green-100 to-teal-100">
          <img src={assets.appointments_icon} alt="Courses Icon" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-semibold text-gray-700">{dashboardData.totalCourses}</p>
            <p className="text-lg text-gray-500">Total Courses</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="flex items-center gap-4 shadow-lg p-5 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100">
          <img src={assets.earning_icon} alt="Earnings Icon" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-semibold text-gray-700">{currency} {dashboardData.totalEarnings}</p>
            <p className="text-lg text-gray-500">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Enrollments Table */}
      <div className="w-full max-w-5xl mt-10 bg-white shadow-lg rounded-xl p-5">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Latest Enrollments</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-6 py-3">Student Image</th>
                <th className="border border-gray-300 px-6 py-3">Student Name</th>
                <th className="border border-gray-300 px-6 py-3">Course Name</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="text-center border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-3">
                    <img src={item.student.imageUrl} alt={item.student.name} className="w-12 h-12 rounded-full mx-auto" />
                  </td>
                  <td className="px-6 py-3 text-gray-700">{item.student.name}</td>
                  <td className="px-6 py-3 text-gray-700">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;




