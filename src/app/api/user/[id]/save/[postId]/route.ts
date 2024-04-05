import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";

export const POST = async (req: Request, { params }: { params: any }) => {
  try {
    await connectDB();

    const userId = params.id;
    const postId = params.postId;

    const user = await User.findById(userId)

    const isSaved = await user?.savedPosts.find(
      (item: any) => item.toString() === postId
    );

    if (isSaved) {
      user.savedPosts = await user?.savedPosts.filter(
        (item: any) => item.toString() !== postId
      );
      await Post.findByIdAndUpdate(postId, {
        $pull: { saves: userId },
      });
    } else {
      user?.savedPosts.push(postId);
      await Post.findByIdAndUpdate(postId, {
        $push: { saves: userId },
      });
    }
    await user.save();

    return new Response("Saved Successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to save/unsave post", { status: 500 });
  }
};
