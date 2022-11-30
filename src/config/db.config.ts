import mongoose from "mongoose";

export default async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`Connected to data base: ${dbConnection.connection.name}`);
  } catch (error: any) {
    throw Error(error);
  }
}
