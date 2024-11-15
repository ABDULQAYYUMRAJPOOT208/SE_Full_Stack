import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order", default: [] }],
  recievePromotions: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
