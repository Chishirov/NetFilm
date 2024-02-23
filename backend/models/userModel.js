import mongoose, { now } from "mongoose";

const UserModel = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    movies: [
      {
        title: { type: String, unique: true, required: true },
        movieId: String,
        isfavorite: Boolean,
        isWatchList: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("user", UserModel);
