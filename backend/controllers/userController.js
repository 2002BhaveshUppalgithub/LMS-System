import Course from "../models/course.js";
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