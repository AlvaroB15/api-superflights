import mongoose, { Schema } from 'mongoose';

export const PassengerSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
  },
  { timestamps: true },
);
