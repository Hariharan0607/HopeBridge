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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      phone,
      location,
      role

    });

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

    const token = generateToken(user._id);

    res.status(201).json({

      success: true,

      message: "Registration Successful",

      token,

      data: user

    });

  } catch (error) {

    res.status(500).json({

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

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,

        message: "Invalid Credentials"

      });

    }

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

    const token = generateToken(user._id);

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      data: user

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};