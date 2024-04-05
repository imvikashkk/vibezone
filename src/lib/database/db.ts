import mongoose, { Mongoose } from "mongoose";

const MongoDB_URI: string = process.env.MONGO_URI!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  try {
    if (cached.conn) return cached.conn;
    cached.promise =
      cached.promise ||
      mongoose.connect(MongoDB_URI, {
        dbName: "clerk-next14-db",
        bufferCommands: false,
        connectTimeoutMS: 50000,
      });
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log("Error TO Connect with MongoDB: ", error);
  }
};

