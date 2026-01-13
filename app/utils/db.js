import mongoose from "mongoose"

const connectionStr = `mongodb+srv://teetwalhartik:hartik123456@cluster0.yuzgqpf.mongodb.net/qr_maker?retryWrites=true&w=majority&appName=Cluster0`

export const connectDB = async () => {
    await mongoose.connect(connectionStr)
}
