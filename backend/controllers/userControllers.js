import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      cart,
      orders,
      recievePromotions,
    } = req.body;
    console.log(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      cart,
      orders,
      recievePromotions
    );

    const existingUser = await User.findOne({ email, phoneNumber });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      cart,
      orders,
      recievePromotions,
    });
    const secret = process.env.JWT_SECRET;
    console.log("SECRET OF JWT IS : ", secret);
    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).send({
      message: "User registered successfully",
      success: true,
      user: newUser,
      token: token,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Error registering user", error: e.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET;
    console.log("SECRET OF JWT IS : ", secret);
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("TOKEN GENERATED IS ", token);
    return res.status(200).send({
      message: "User signed in successfully",
      success: true,
      user: user,
      token: token,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error signing in user", error: err.message });
  }
};

export { registerUser, signInUser };
