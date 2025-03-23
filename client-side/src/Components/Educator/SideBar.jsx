import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Course", path: "/educator/my-course", icon: assets.my_course_icon },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
  ];

  return (
    isEducator && (
      <div className="w-60 h-full bg-white shadow-lg fixed top-16 left-0 flex flex-col p-5 z-40">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 my-2 rounded-lg transition-all duration-300 ${
                isActive ? "bg-gray-100 text-blue-500" : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`
            }
          >
            <img src={item.icon} className="w-6 h-6" alt={`${item.name} icon`} />
            <p className="text-base font-medium">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default SideBar;