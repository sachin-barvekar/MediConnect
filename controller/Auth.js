const User = require('../models/User')

exports.login = async (req, res) => {
  try {
    // Step 1: Get email, name, role, and profileImg from the request body
    const { email, name, role, profileImg } = req.body;
    console.log(req.body)

    // Step 2: Validate input fields
    // if (!email || !name || !role) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide all required fields: email, name, role, and profileImg",
    //   });
    // }

    // Step 3: Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (user) {
      // Check if role matches
      if (user.role !== role) {
        return res.status(403).json({
          success: false,
          message: `You are already registered with the role '${user.role}'. Please log in with the correct role.`,
        });
      }

      return res.status(200).json({
        success: true,
        user,
        message: "User logged in successfully",
      });
    }

    // Step 4: If user doesn't exist, register a new user
    const newUser = await User.create({
      email,
      name,
      role,
      profileImg, // Save the profile image
    });

    return res.status(201).json({
      success: true,
      user: newUser,
      message: "User registered and logged in successfully",
    });
  } catch (error) {
    console.error("Error during login", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
