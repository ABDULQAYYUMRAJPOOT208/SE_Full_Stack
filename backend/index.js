import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
connection();
dotenv.config();
const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "https://ecommerceseproject.vercel.app", // specify the frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // allow necessary methods
    credentials: true, // if you’re using cookies or other credentials
  })
);
app.use(express.json());
app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.json({ Message: "this is running correctly" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
