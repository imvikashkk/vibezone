import Post from "@/lib/models/Post";
import { connectDB } from "@/lib/database/db";


/* Get All Posts */
export const GET = async () =>{
    try{
        await connectDB();
        const feedPosts = await Post.find().populate("creator likes").exec()
        return new Response(JSON.stringify(feedPosts), { status: 200 })
    }catch(err){
        console.log(err)
        return new Response("Failed to fetch all Feed Posts", { status: 500 })
    }
}