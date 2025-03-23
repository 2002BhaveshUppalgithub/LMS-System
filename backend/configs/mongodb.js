import mongoose from "mongoose";

// connect to moongodb database
const connectDB=async () => {

    mongoose.connection.on("connected",()=>console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/LMS-system`);
    
}

export default connectDB;

