import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection = async () => {
  const url = process.env.MONGO_URL;
  await mongoose
    .connect(url)
    .then((connection) => {
      console.log("Connected to Mongodb at url " + url);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
      process.exit(1);
    });
};

export default connection;
