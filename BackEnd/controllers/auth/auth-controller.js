const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/users");

const {
  generateTokenAndSetCookie,
} = require("../../utils/generateTokenAndSetCookie");

const {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../../mailtrap/emails");

/**
 * Register a new user
 */
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({ success: false, message: "A user with this email already exists" });

    const hashPassword = await bcrypt.hash(password, 12);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    // Email sending - won't break registration if it fails
    const emailSent = await sendVerificationEmail(newUser.email, verificationToken);
    if (!emailSent) {
      console.error("Verification email sending failed for:", newUser.email);
    }

    const user = newUser.toObject();
    user.id = user._id;
    delete user._id;
    delete user.password; // Security: ensure password hash is never sent to frontend

    res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email for verification code.",
      user,
    });

  } catch (e) {
    console.error("Registration error:", e);
    res.status(500).json({ success: false, message: "Internal server error during registration" });
  }
};

/**
 * Verify user email with code
 */
const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.userName);

    // Clear session so user has to log in fresh after verification
    res.clearCookie("token");

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ success: false, message: "Internal server error during verification" });
  }
};

/**
 * Authenticate user
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // Security: Use generic error message to prevent account enumeration
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    const userData = user.toObject();
    userData.id = userData._id;
    delete userData._id;
    delete userData.password; // Security: ensure password hash is never sent

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });

  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ success: false, message: "Internal server error during login" });
  }
};

/**
 * Log out user
 */
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  }).status(200).json({ success: true, message: "Logged out successfully" });
};

/**
 * Handle forgot password request
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Security: Even if user not found, return success to prevent email enumeration
      return res.status(200).json({
        success: true,
        message: "If an account exists with this email, a reset link has been sent"
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "If an account exists with this email, a reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Reset password with token
 */
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Authentication Middleware
 */
const authMiddleware = (req, res, next) => {
  // Security: Only accept token from cookies to prevent XSS-to-CSRF escalation
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ success: false, message: "Invalid session token" });
  }
};

/**
 * Check current auth status
 */
const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const userData = user.toObject();
    userData.id = userData._id;
    delete userData._id;

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("checkAuth error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  authMiddleware,
  checkAuth,
};