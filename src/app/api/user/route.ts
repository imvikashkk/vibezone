import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";


/* Get All Users */
export const GET = async (req: Request) => {
  try {
    await connectDB();
    const allUsers = await User.find()
      .populate("posts savedPosts likedPosts followers following")
      .exec();
    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get all users", { status: 500 });
  }
};
