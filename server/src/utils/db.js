import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDb;