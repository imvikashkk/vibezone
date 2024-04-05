import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";


// Get User Details
export const GET = async (req:Request, { params }:{params:any}) => {
    try {
      await connectDB();
      const user = await User.findById(params.id)
        .populate({
          path: "posts savedPosts likedPosts",
          model: Post,
          populate: {
            path: "creator",
            model: User,
          },
        })
        .populate({
          path: "followers following",
          model: User,
          populate: {
            path: "posts savedPosts likedPosts",
            model: Post,
          },
        })
        .exec();
  
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Failed to get user", { status: 500 });
    }
  };