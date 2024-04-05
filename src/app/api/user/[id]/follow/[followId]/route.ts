import User from "@/lib/models/User";
import { connectDB } from "@/lib/database/db";


/* Follow and Unfollow */
export const POST = async (req: Request, { params }: { params: any }) => {
  try {
    await connectDB();

    const userId = params.id
    const followId = params.followId


    const user = await User.findById(userId)
    const personToFollow = await User.findById(followId)
    const isFollowing = await user.following.find((item:any) => item.toString() === followId);

    if (isFollowing) {
        user.following = await user.following.filter((item:any) => item.toString() !== followId)
        personToFollow.followers = personToFollow.followers.filter((item:any) => item.toString() !== userId)
      } else {
        user.following.push(followId)
        personToFollow.followers.push(userId)
      }
  
      await user.save()
      await personToFollow.save()
  
      return new Response("followed successfully", { status: 200 })

  } catch (error) {
    console.log(error);
    return new Response("Failed to follow/unfollow user", { status: 500 });
  }
};
