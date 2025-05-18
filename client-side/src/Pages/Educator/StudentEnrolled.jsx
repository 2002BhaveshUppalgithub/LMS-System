import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentEnrolled = () => {
  const { backend_url, isEducator, getToken } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backend_url + '/api/educator/enrolled-student', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success && Array.isArray(data.enrolledStudents)) {
        setEnrolledStudents([...data.enrolledStudents].reverse());
      } else {
        toast.error(data.message || "Failed to load students");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-6 bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Students Enrolled</h1>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-6 py-4 text-left">Student Image</th>
              <th className="border border-gray-300 px-6 py-4 text-left">Student Name</th>
              <th className="border border-gray-300 px-6 py-4 text-left">Course Title</th>
              <th className="border border-gray-300 px-6 py-4 text-left">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border border-gray-300 px-6 py-4 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt={item.student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.student.name}</td>
                <td className="border border-gray-300 px-6 py-4 text-gray-700">{item.courseTitle}</td>
                <td className="border border-gray-300 px-6 py-4 text-gray-500">
                  {new Date(item.purchaseData).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentEnrolled;
