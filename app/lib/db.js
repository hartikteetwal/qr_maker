import mongoose from "mongoose"

const connectionStr = `mongodb+srv://teetwalhartik_db_user:hartik12346@cluster0.u51uzy2.mongodb.net/qr_maker?retryWrites=true&w=majority&appName=Cluster0`

// mongodb + srv://teetwalhartik_db_user:hartik12346@cluster0.u51uzy2.mongodb.net/Revision_mern?retryWrites=true&w=majority&appName=Cluster0
// mongodb + srv://teetwalhartik_db_user:hartik12346@cluster0.u51uzy2.mongodb.net/
// mongodb + srv://teetwalhartik_db_user:<db_password>@cluster0.u51uzy2.mongodb.net/?appName=Cluster0
export const connectDB = async () => {
    await mongoose.connect(connectionStr);
    console.log("Connected")
} 