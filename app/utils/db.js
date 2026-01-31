import mongoose from "mongoose"

const connectionStr = process.env.MONGODB_URI 

export const connectDB = async () => {
    await mongoose.connect(connectionStr)
}
