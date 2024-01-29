import mongoose from "mongoose";

const connectDB = (url: any) => {
    mongoose.connect("mongodb://127.0.0.1:27017/task_app");
}

export default connectDB