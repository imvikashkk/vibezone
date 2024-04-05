import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";
// import path from "node:path";
// import { writeFile } from "fs/promises";

export const POST = async (req: Request, res: Response) => {
  try {
    // connect to database
    await connectDB();

    // current working directory
    const currentWorkingDirectory = process.cwd();
    // form data
    const data = await req.formData();
    // get data from request
    let postPhoto: any = data.get("postPhoto");
    let creatorId: any = data.get("creatorId");
    // convert to bytes
  
    
    // create post
    const newPost = new Post({
      creator: creatorId,
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto,
    });
    await newPost.save();

    // update user's posts
    await User.findByIdAndUpdate(
      creatorId,
      {
        $push: { posts: newPost._id },
      },
      { new: true, useFindAndModify: false }
    );
    // Finally Success Response
    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
