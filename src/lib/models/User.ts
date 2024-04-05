import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    posts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    savedPosts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    likedPosts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    createdUserAt: {
      type: Date,
    },
    updatedUserAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export interface UserType {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePhoto: string;
  posts: any[];
  savedPosts: any[];
  likedPosts: any[];
  followers: any[];
  following: any[];
  createdUserAt?: Date;
  updatedUserAt?: Date;
  [key: string]: any; // Index signature to allow any additional properties
}

export default User;
