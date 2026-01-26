import mongoose from "mongoose";

const { Schema, model, models, Types } = mongoose;

const qrCodeSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    user_id: {
      type: Types.ObjectId, // better to use ObjectId for referencing users
      required: true,
      ref: "User", // optional, if you have a User collection
    },
    upi_Id: {
      type: String,
      required: true,
    },
    upi_name: {
      type: String,
      required: true,
    },
    qr_code_image: {
      type: String,
      required: true,
    },
    used_count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    minimize: false,
  }
);

const QrModel = models.qr_code || model("qr_code", qrCodeSchema);

export default QrModel;
