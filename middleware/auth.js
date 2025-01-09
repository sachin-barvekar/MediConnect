const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// // Check authenticity of the user
// exports.auth = (req, res, next) => {
//     try {
//         // Extract JWT token
//         const token = req.body.token || req.cookies.CommunityConnect;
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Token Missing',
//             });
//         }

//         // Verify the token
//         try {
//             const decode = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = decode; // Store the decoded token in request object
//             next(); // Go to next middleware
//         } catch (error) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Token is invalid',
//             });
//         }
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: 'Something went wrong while verifying the token',
//             error: error.message,
//         });
//     }
// };
  
// // Authorization middleware for community member
// exports.isCommunityMember = (req, res, next) => {
//     try {
//         if (req.user.role !== 'community member') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'This is a protected route for community members only',
//             });
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'User role is not matching',
//             error: error.message,
//         });
//     }
// };

// // Authorization middleware for community business
// exports.isCommunityBusiness = (req, res, next) => {
//     try {
//         if (req.user.role !== 'community business') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'This is a protected route for community businesses only',
//             });
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'User role is not matching',
//             error: error.message,
//         });
//     }
// };

// // Authorization middleware for community organization
// exports.isCommunityOrganization = (req, res, next) => {
//     try {
//         if (req.user.role !== 'community organization') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'This is a protected route for community organizations only',
//             });
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'User role is not matching',
//             error: error.message,
//         });
//     }
// };

// // Authorization middleware for community business or organization
// exports.isCommunityBusinessOrOrganization = (req, res, next) => {
//     try {
//         const allowedRoles = ['community business', 'community organization'];
//         if (!allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'This is a protected route for community businesses or organizations only',
//             });
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'User role is not matching',
//             error: error.message,
//         });
//     }
// };



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
