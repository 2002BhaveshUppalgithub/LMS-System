import express from 'express';
import {clerkClient} from '@clerk/express';
import Course from '../models/course.js';
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from '../models/purchase.js';


// update role to educator
export const updateRoleEducator= async(req,res)=>{

    try {

        const userId=req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role:'educator',
            }
        })

        res.json({success:true, message:'you can published a course now'});

        
    } catch (error) 
    {
        res.json({success:false, message:error.message});

        
    }
}



// Add new courses
export const addCourse=async (req, res) => {

    try {

        console.log(req.file)

        const {courseData}=req.body;
        const imageFile=req.file;
        const educatorId=req.auth.userId;

        if(!imageFile)
        {
            return   res.json({success:false, message:'Thumbnail Not Allowed'});
        }


        const parseCoureData=await JSON.parse(courseData);
        parseCoureData.educator=educatorId

        // store in database
      const newCourse= await Course.create(parseCoureData);
      // upload this image in cloudinary
     const imageupload= await cloudinary.uploader.upload(imageFile.path);
     // secure url of image 
     newCourse.courseThumbnail=imageupload.secure_url;
     await newCourse.save();


     res.json({success:true, message:'Course Added'})

        
    } catch (error) {

        res.json({success:false, message:error.message});
        
    }
    
}




// api for get all corses of particular educator 

export const getEducatorCourses=async(req,res)=>{

    try {

        const educator=req.auth.userId;
        const courses=await Course.find({educator});
        res.json({success:true, courses});
        
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}


// get Educator dashboard data (total earning Enrolled students no of courses)

export const educatorDashBoardData=async(req, res)=>{
    try {
        const educator=req.auth.userId;
        const courses=await Course.find({educator});
        const totalCourses=courses.length;

        const courseIds=courses.map((course)=>course._id);

        // calculate total earnings from purchases
        const purchases=await Purchase.find({
            courseId:{$in:courseIds},
            status:'completed'
        })

        const totalEarnings= purchases.reduce((sum,purchase)=>sum+purchase.amount,0);


        // collect unique enroolled studenst ID's with there course title
        const enrolledStudentsData=[];
        for(const course of courses)
        {
            const students=await User.find({
                _id:{$in:course.enrolledStudents}
            }, 'name imageUrl')


            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle:course.courseTitle,
                    student
                })
                
            });
        }

        res.json({success:true, dashBoardData:{
            totalEarnings,
            enrolledStudentsData,
            totalCourses,

        }})
        
    } catch (error) {

        res.json({success:false, message:error.message});
        
    }
}



// get Enrolled students data with purchases data 
export const getEnrolledStudentData=async(req, res)=>{
    try {
        const educator=req.auth.userId;
        const courses=await Course.find({educator});
        const courseIds=courses.map((course)=>course._id);

        // calculate total earnings from purchases
        const purchases=await Purchase.find({
            courseId:{$in:courseIds},
            status:'completed'
        }).populate('userId','name imageUrl').populate('courseId', 'courseTitle')
        


        // find student data 
        const enrolledStudents=purchases.map(purchase=>({
            student:purchase.userId,
            courseTitle:purchase.courseId.courseTitle,
            purchaseData:purchase.createdAt
        }))


        res.json({success:true, enrolledStudents});
        
    } catch (error) {

        res.json({success:false, message:error.message});

        
    }

}



