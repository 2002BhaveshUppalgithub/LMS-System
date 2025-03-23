import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { AppContext } from '../../Context/AppContext';


const NavBar = () => {

    const {navigate, isEducator, setIsEducator}=useContext(AppContext); 

    // authication page open with clerk
    const {openSignIn}=useClerk();
    const {user}=useUser();

    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/course-list');    

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
            <img 
                src={assets.logo} 
                onClick={()=>navigate('/')}

                alt='Logo' 
                className="w-28 lg:w-32 cursor-pointer" 
            />

            {/* Desktop View */}
            <div className='hidden md:flex items-center gap-5 text-gray-500'>
                <div className='flex items-center gap-5'>
                   {
                    user && <> <button onClick={()=>navigate('/educator')}  className='cursor-pointer' >{isEducator? 'EducatorDashBorad':"Become Educator"}</button> | <Link to="/my-enrolments">My Enrollment</Link></>
                   }
                </div>
                {user? <UserButton/>:  <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer'>Create Account</button>}
              
            </div>


            {/* Mobile View */}
            <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>        
                <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>                  
                  {user && <>  <button onClick={()=>navigate('/educator')}  className='cursor-pointer' >{isEducator?'EducatorDashBorad':"Become Educator"}</button> | 
                    <Link to="/my-enrolments">My Enrollment</Link></>}
                </div>
                {
                    user ?<UserButton/> : <button onClick={()=>openSignIn()}><img src={assets.user_icon} alt='User Icon' className="w-8 h-8"/></button>  
                }
                          
            </div>
        </div>
    );
}

export default NavBar;
