import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        //("mongoDB connected");
    } catch (error) {
        //(error);
    }
}

export default connectDB;










