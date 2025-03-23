import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';

const StudentEnrolled = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(dummyStudentEnrolled);
  }, []);

  return (
    <div className="w-full max-w-5xl mt-10">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">Students Enrolled</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              
              <th className="border border-gray-300 px-4 py-2">Student Image</th>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">Course Title</th>
              <th className="border border-gray-300 px-4 py-2">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index} className="text-center border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  <img src={item.student.imageUrl} alt={item.student.name} className="w-10 h-10 rounded-full mx-auto" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.student.name}</td>
                
                <td className="border border-gray-300 px-4 py-2">{item.courseTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentEnrolled;
