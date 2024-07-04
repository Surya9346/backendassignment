import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      trim: true,
    },
    buy: {
      type: String,
      required: true,
      trim: true,
    },
    sell: {
      type: String,
      required: true,
      trim: true,
    },
    volume: {
      type: String,
      required: true,
      trim: true,
    },
    base_unit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Crypto = mongoose.model("Crypto", cryptoSchema);
