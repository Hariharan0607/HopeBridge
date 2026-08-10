const User = require("../models/User");
const Trust = require("../models/Trust");

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ======================
// Register User
// ======================

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      location,
      role,

      trustName,
      registrationNumber,
      category,
      description,
      address,
      beneficiaries
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      role
    });

    // Create Trust only if role is trust
    if (role === "trust") {
      await Trust.create({
        userId: user._id,
        trustName,
        registrationNumber,
        category,
        description,
        address,
        beneficiaries
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove password before sending user data
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      data: userResponse
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ======================
// Login User
// ======================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      data: userResponse
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};