import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  phone: { type: String },
  fullName: String,
  username: { type: String, unique: true },
  password: String
});

export default mongoose.model("User", userSchema);
