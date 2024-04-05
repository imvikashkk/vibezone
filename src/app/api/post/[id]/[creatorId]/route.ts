import Post from "@/lib/models/Post";
import { connectDB } from "@/lib/database/db";
import User from "@/lib/models/User";
import fs from "fs"
import path from "path";

/* Delete A Post By ID */
export const DELETE = async (req: Request, { params }: { params: any }) => {
  try {
    await connectDB();
    const creatorId = params.creatorId;
    const postId = params.id;

    // find the post
    const post = await Post.findById(postId).populate("likes saves");

    // removed likes from user likedPosts
    for (let i = 0; i < post.likes.length; i++) {
      await User.findByIdAndUpdate(post.likes[i], {
        $pull: { likedPosts: postId },
      });
    }


    // remove saves from user savedPosts 
    for (let i = 0; i < post.saves.length; i++) {
      await User.findByIdAndUpdate(post.saves[i], {
        $pull: { savedPosts: postId },
      });
    }

    // remove from creator Id
    await User.findByIdAndUpdate(creatorId, {
      $pull: { posts: postId },
    });

    // finally delete the post
    await Post.findByIdAndDelete(postId);

    return new Response("SuccessFully Deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete the post", { status: 500 });
  }
};
