import express from 'express';

import { addCourse, educatorDashBoardData, getEducatorCourses, getEnrolledStudentData, updateRoleEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';


// create route for updating educator role 

const educatorRouter=express.Router();

// add educator role 
educatorRouter.get('/update-role',updateRoleEducator);

educatorRouter.post('/add-course',upload.single('image'),protectEducator, addCourse);

educatorRouter.get('/courses',protectEducator, getEducatorCourses);

educatorRouter.get('/dashboard',protectEducator, educatorDashBoardData);

educatorRouter.get('/enrolled-student',protectEducator, getEnrolledStudentData);

export default educatorRouter;




        