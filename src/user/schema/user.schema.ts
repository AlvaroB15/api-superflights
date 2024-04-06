import mongoose, { Schema } from 'mongoose';

export const UserSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

// UserSchema.index({ username: 1 });
// UserSchema.index({ email: 1 });

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
