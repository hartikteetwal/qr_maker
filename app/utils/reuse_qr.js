import mongoose from "mongoose";

const { Schema, model, models, Types } = mongoose;

const reuseQrCodeSchema = new Schema(
    {
        qr_id: {
            type: Types.ObjectId,
            required: true,
        },
        user_id: {
            type: Types.ObjectId, // better to use ObjectId for referencing users
            required: true,
            ref: "User", // optional, if you have a User collection
        },
    
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt fields
        minimize: false,
    }
);

const reuseQrModel = models.qr_code || model("reuse_qr_code", reuseQrCodeSchema);

export default reuseQrModel;
