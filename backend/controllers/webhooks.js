import { EndpointSecretOut, Webhook } from "svix";
import User from "../models/user.js";
import Stripe from "stripe";
import { Purchase } from "../models/purchase.js";
import Course from "../models/course.js";

// api conroller function to manage clerk user with databases

export const clerkWebhooks=async (req,res) => {

    try {

        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })


        // create diffrent cases for handling situation 

        const {data, type}=req.body;

        // case 1  user created

        switch(type)
        {
            case 'user.created':{
                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    imageUrl:data.image_url
                }

                // store it in user database
                await User.create(userData);
                res.json({})
                break;
            }

            case 'user.updated':{
                const userData={
                    _id:data.id,
                    email:data.email_address[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    imageUrl:data.image_url
                }

                await User.findByIdAndUpdate(data.id,userData);
                res.json({});
                break;
            }

            case 'user.deleted':{

                await User.findByIdAndDelete(data.id);
               
                res.json({});
                break;
            }

            default:
                break;
        }

        
        
        
    } catch (error) {

        res.json({success:false , message:error.message})

        
    }
    
}


// function to handle weebhooks 
const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeWeebhooks=async(request, response)=>{
    const sig=request.headers['stripe-signature'];
    
    let event;
    try {

        event=Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEEBHOOK_SECRET);
        
    } catch (error) {
        response.status(400).send(`Webhooks Error :${error.message}`);
        
    }


    // handle events of stripe 

    switch(event.type)
    {
        case 'payment_intent.succeeded':{
            const paymentIntend= event.data.object;
            const paymentIntendId=paymentIntend.id;

            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntendId
            })

            const {purchaseId}=session.data[0].metadata;

            const purchaseData=await Purchase.findById(purchaseId)
            const userData=await User.findById(purchaseData.userId);
            const courseData= await Course.findById(purchaseData.courseId.toString());

            // save the user in courese data 
            courseData.enrolledStudents.push(userData);
            await courseData.save();

            // save the student data with that particular courses they enrolled 
            userData.enrolledCourses.push(courseData._id);
            await userData.save();

            purchaseData.status='completed'
            purchaseData.save();

            break;
        }

        case 'payment_intent.payment_failed':{

            const paymentIntend= event.data.object;
            const paymentIntendId=paymentIntend.id;

            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntendId
            })

            const {purchaseId}=session.data[0].metadata;

            const purchaseData=await Purchase.findById(purchaseId);
            purchaseData.status='failed'
            await purchaseData.save();
            break;

        }


        default:
            console.log(`unhandle events type ${event.type}`);
    }



    response.json({received:true});

}