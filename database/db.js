import mongoose from "mongoose";

export const dbConnection = async () =>{
    try {
      await mongoose.connect(process.env.DBURL)  
      console.log("DB connected successfully");
    } catch (error) {
        console.log(error,"DB connection error" );
    }
}