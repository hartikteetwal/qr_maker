import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userId: String,
        upiId: { type: String },
        password: String,
        upiId: String
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
