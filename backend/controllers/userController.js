import Course from "../models/course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Purchase } from "../models/purchase.js";
import User from "../models/user.js";
import Stripe from 'stripe';

// get particular user data
export const getUserData=async(req, res)=>{

    try {

        const userId=req.auth.userId;
        const user= await User.findById(userId);

        if(!user)
        {
            return res.json({success:false, message:'User not found'});
        }
        
        res.json({success:true, user});
    } catch (error) {

        res.json({success:false, message:error.message});
        
    }

}


// get paticular user enrolled courses with lecture link
export const getUserEnrolledCourses=async(req, res)=>{
    try {
        const userId=req.auth.userId;
        const userData=await User.findById(userId).populate('enrolledCourses');

        res.json({success:true, enrolledCourses:userData.enrolledCourses});
        
    } catch (error) {

        res.json({success:false, message:error.message});
        
    }
}


// user purchase course 
export const purchaseCourse= async(req, res)=>{
    
    try {

        const {courseId}=req.body;
        const {origin}=req.headers;
        const userId=req.auth.userId;
        const userData=await User.findById(userId);
        const courseData=await Course.findById(courseId);

        if(!courseData || !userData)
       {
          res.json({success:false , message:'Data not found'})
       }

       // create purschase data 

       const purchaseData={
        courseId:courseData._id,
        userId,
        amount:(courseData.coursePrice-courseData.discount*courseData.coursePrice/100).toFixed(2)
       }

       // store purchase data in mongodb 
       const newPurchase = await Purchase.create(purchaseData);

       // stripe gateway initilise
       const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY)
       const currency=process.env.CURRENCY.toLowerCase();

       // create line items for stripe 

       const line_items=[{
        price_data:{
            currency,
            product_data:
            {
                name:courseData.courseTitle
            },
            unit_amount:Math.floor(newPurchase.amount)*100

        },
         quantity:1

       }]


       /// add payment section
       const session =await stripeInstance.checkout.sessions.create({
        success_url:`${origin}/loading/my-enrollments`,
        cancel_url:`${origin}`,
        line_items:line_items,
        mode:'payment',
        metadata:{
          purchaseId:newPurchase._id.toString()
        }
       })


       res.json({success:true, session_url:session.url})
   
    } catch (error) {

        res.json({success:false, message:error.message});
        
    }
}



// add wheather user completed the course or not (update user course progress)

export const updateUserCourseProgress=async(req, res)=>{
    
    try {
        const userId= req.auth.userId;
        const {courseId, lectureId}=req.body;

        const progressData= await CourseProgress.findOne({userId, courseId});
        
       
        if(progressData)
        {
             // if progress data is alreday there means lecture is completed
            if(progressData.lectureCompleted.includes(lectureId))
            {
                return res.json({success:true, message:'Lecture Already Completed'})
            }

            // if not completed
            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }

        // if not any of course  is there just add that course for student
        else
        {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted:[lectureId]
            })
        }

        res.json({success:true, message:'progress updated'})
        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }

}



// get User Course Progress
export const getUserCourseProgress= async(req, res)=>{

    try {

        const userId= req.auth.userId;
        const {courseId, lectureId}=req.body;

        const progressData= await CourseProgress.findOne({userId, courseId});
        res.json({success:true,progressData })
        
    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}



// // add user rating function 
// export const addUserRating= async(req, res)=>{

//     const userId=req.auth.userId;
//     const {courseId, rating}=req.body;

//     if(!userId || !courseId || !rating || rating<1 || rating>5)
//     {
//         return res.json({success:false ,message:"Invalid details"})
//     }

//     try {
//         const course= await Course.findById(courseId);

//         if(!course)
//         {
//             return res.json({success:false , message:'course not found'})
//         } 
//         const user = await User.findById(userId);
//         if(!user || !user.enrolledCourses.includes(courseId))
//         {
//             return res.json({success:false , message:'user have not purchase the course'})

//         }  
        
//         // if user have alredy gave the ratings 
//         const existingRatingIndex= course.courseRatings.findIndex(r=>r.userId===userId)
//         if(existingRatingIndex>1)
//         {
//             course.courseRatings[existingRatingIndex].rating=rating;
//         }
//         else{
//             course.courseRatings.push({userId, rating});
//         }

//         await course.save();
//         res.json({success:true, message:'Rating added'})
       
//     } catch (error) {
//         res.json({success:false, message:error.message})
        
//     }

// }


export const addUserRating = async (req, res) => {
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: "Invalid details" });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const user = await User.findById(userId);
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.status(403).json({ success: false, message: "User has not purchased the course" });
        }

        // Check if user has already rated
        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);
        if (existingRatingIndex >-1) {
            course.courseRatings[existingRatingIndex].rating = rating;
        } else {
            course.courseRatings.push({ userId, rating });
        }

        await course.save();
        res.json({ success: true, message: "Rating added successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

