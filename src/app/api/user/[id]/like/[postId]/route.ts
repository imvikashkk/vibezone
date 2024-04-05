import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";

export const POST = async (req: Request, { params }: { params: any }) => {
  try {
    await connectDB();

    const userId = params.id;
    const postId = params.postId;

    const user = await User.findById(userId)
      .populate("posts savedPosts following followers")
      .populate({
        path: "likedPosts",
        model: "Post",
        populate: {
          path: "creator",
          model: "User",
        },
      });

    const post = await Post.findById(postId).populate("creator likes");
    const isLiked = await user.likedPosts.find(
      (item:any) => item._id.toString() === postId
    );

    if (isLiked) {
      user.likedPosts = await user.likedPosts.filter(
        (item:any) => item._id.toString() !== postId
      );
      post.likes = await post.likes.filter(
        (item:any) => item._id.toString() !== user._id.toString()
      );
    } else {
      await user.likedPosts.push(post._id);
      await post.likes.push(user._id);
    }

    await user.save();
    await post.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to like/dislike post", { status: 500 });
  }
};
