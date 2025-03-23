import express from 'express';
import cors from "cors";
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';


// initize Express
const app=express();

// connect to database
await connectDB();

// middleware
app.use(cors());

// Routes
app.get("/", (req,res)=>res.send("api working "));
app.post("/clerk",express.json(), clerkWebhooks)

// port no 
const PORT=process.env.PORT || 5000;



// start server 
app.listen(PORT, ()=>console.log("server started :"+PORT));
