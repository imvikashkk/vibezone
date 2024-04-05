import Post from "@/lib/models/Post";
import { connectDB } from "@/lib/database/db";


/* Get Post A By ID */
export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    await connectDB();
    const post = await Post.findById(params.id)
      .populate("creator likes saves")
      .exec();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Fail to get post by id", { status: 500 });
  }
};

/* Edit and Update Post  */
export const PATCH = async (req: Request, { params }: { params: any }) => {
  try {
    // connect to database
    await connectDB();

    const data = await req.formData();
    const post = await Post.findById(params.id)
      post.tag = data.get("tag");
      post.caption = data.get("caption");
      post.postPhoto = data.get("postPhoto");
    await post.save();

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update the post", { status: 500 });
  }
};
