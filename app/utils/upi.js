import mongoose from "mongoose";

const { Schema, model, models, Types } = mongoose;

const upiSchema = new Schema(
  {
    upi_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: Types.ObjectId, // better to use ObjectId for referencing users
      required: true,
      ref: "User", // optional, if you have a User collection
    },
    upi_name:{
        type: String,
        required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    minimize: false,
  }
);

const UpiModel = models.upi_data || model("upi_data", upiSchema);

export default UpiModel;