const User = require('../models/User');
require('dotenv').config();

exports.auth = async(req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(400).json({
                success: false,
                message: "Token is missing"
            });
        }

        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
        } catch(error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

        // Go to the next middleware
        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}

// isPatient middleware
exports.isPatient = async(req, res, next) => {
    try {
        const userDetails = await User.findOne({email: req.user.email})

        if (userDetails.role !== "patient") {
            return res.status(400).json({
                success: false,
                message: "This is protected route for patient"
            })
        }
        next();
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: "User role can't be Verified",
        })
    }
}

// isDoctor middleware
exports.isDoctor = async(req, res, next) => {
    try {
        const userDetails = await User.findOne({email: req.user.email});

        if(userDetails.role !== "doctor") {
            return res.status(400).json({
                success: false,
                message: "This is protected for doctor",
            })
        }
        next();
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: "User role can't be Verified",
        })
    }
}
