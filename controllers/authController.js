import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import envConfig from "../config/envConfig.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      envConfig.jwt_secret_key,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: envConfig.node_env === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      userId: user._id,
      username: user.username,
      role: user.role,
      profile: user.profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { username, email, password, role, profile = {} } = req.body;

    const trimmedUsername = username.trim();
    const validRoles = ["student", "instructor"];
    const assignedRole = validRoles.includes(role) ? role : "student";

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newProfile = {
      firstName: profile.firstName?.trim() || "",
      lastName: profile.lastName?.trim() || "",
      bio: profile.bio?.trim() || "",
      profilePicture: profile.profilePicture?.trim() || "",
    };

    user = new User({
      username: trimmedUsername,
      email,
      password,
      role: assignedRole,
      profile: newProfile,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      envConfig.jwt_secret_key,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: envConfig.node_env === "production",
      sameSite: envConfig.node_env === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyValidatedUser = async (req, res) => {
  try {
    return res.status(200).json({ userId: req.userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  return res.json({ message: "Logout successful" });
};
