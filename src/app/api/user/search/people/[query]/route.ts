import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";

export const GET = async (req:Request, { params }:{params:any}) => {
  const { query } = params;
  const searchQuery = query.trim();
  const sq = searchQuery.split(" ");

  try {
    await connectDB();

    if(sq.length === 2){
      const searchedUsers = await User.find({
        $or: [
          { firstName: { $regex: sq[0], $options: "i" } },
          { lastName: { $regex: sq[1], $options: "i" } },
        ],
      }).populate("posts savedPosts likedPosts followers following").exec();
      return new Response(JSON.stringify(searchedUsers), { status: 200 });
    }
    else if(sq.length === 3){
      const searchedUsers = await User.find({
        $or: [
          { firstName: { $regex: sq[0], $options: "i" } },
          { lastName: { $regex: `${sq[1]}+${sq[2]}`, $options: "i" } },
          { firstName: { $regex: `${sq[0]}+${sq[1]}`, $options: "i" } },
          { lastName: { $regex: sq[2], $options: "i" } },
        ],
      }).populate("posts savedPosts likedPosts followers following").exec();
      return new Response(JSON.stringify(searchedUsers), { status: 200 });
    }else{
      const searchedUsers = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      }).populate("posts savedPosts likedPosts followers following").exec();
  
      return new Response(JSON.stringify(searchedUsers), { status: 200 });
    }

  } catch (err) {
    console.log(err);
    return new Response("Failed to get users by search", { status: 500 })
  }
}