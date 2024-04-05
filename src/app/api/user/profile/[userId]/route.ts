import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";

export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    await connectDB();

    const user = await User.findOne({username:params.userId})
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
      if(user){
        return new Response(JSON.stringify(user), { status: 200 });
      }else{
        return new Response("user not found", { status: 404 });
      }

  } catch (error) {
    console.log(error);
    return new Response("Failed to get user", { status: 500 });
  }
};
