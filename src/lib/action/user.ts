import User from "../models/User";
import {connectDB} from "../database/db";

type userType = {
    clerkId:string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    profilePhoto:string;
    createdUserAt?:any;
    updatedUserAt?:any;
    userId?:any; // objects
}

export async function createUser(user:userType){
    try{
        await connectDB();
        const newUser = new User(user);
        await newUser.save();
        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        console.log(error);
    }
}

export async function updateUser(user:userType){
    try{
        await connectDB();
        const updateduser = await User.findByIdAndUpdate(user.userId, user, {new:true});
        await updateduser.save();
        return JSON.parse(JSON.stringify(updateduser));
    }catch(error){
        console.log(error);
    }
}