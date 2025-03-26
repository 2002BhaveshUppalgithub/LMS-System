import express from 'express';
import cors from "cors";
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWeebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoute.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';


// initize Express
const app=express();

// connect to database
await connectDB();
// connect cloudinary
await connectCloudinary();

// middleware
app.use(cors());
app.use(clerkMiddleware())

// Routes
app.get("/", (req,res)=>res.send("api working "));
app.post("/clerk",express.json(), clerkWebhooks)
app.use("/api/educator",express.json(), educatorRouter);

app.use("/api/course",express.json(),courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post('/stripe', express.raw({type:'application/json'}), stripeWeebhooks)


// port no 
const PORT=process.env.PORT || 5000;


// start server 
app.listen(PORT, ()=>console.log("server started :"+PORT));
