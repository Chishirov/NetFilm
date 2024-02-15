import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  movies: [
    {
      title: String,
      movieId: String,
    }
  ]
});

export default mongoose.model("user", UserModel);
