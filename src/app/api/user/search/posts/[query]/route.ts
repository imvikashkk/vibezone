import Post from "@/lib/models/Post";
import { connectDB } from "@/lib/database/db";

export const GET = async (req:Request, { params }:{params:any}) => {
  const { query } = params;
  try {
    await connectDB();

    const searchedPosts = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } }
      ],
    }).populate("creator").exec();

    return new Response(JSON.stringify(searchedPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get posts by search", { status: 500 })
  }
}