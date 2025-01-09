const PatientDetails = require("../models/PatientDetails")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.addPatientData = async(req, res) => {
    try {
        // get patient id
        const patientId = req.user.id;

        // get data from req body
        const {bloodPressure, heartRate, weight, height, emergencyContactNo} = req.body;

        // get file from user
        const image = req.files.image;

        // validation
        if(!bloodPressure|| heartRate || !weight || !height || !emergencyContactNo) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const patientDetails = await User.findById(patientId, {
            role: "patient",
        });

        if(!patientDetails) {
            return res.status(404).json({
                success: false,
                message: "Patient details not found",
            })
        }

        // upload image to cloudinary
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        console.log(uploadedImage);

        // Create medical records entry in database
        const patientData = await PatientDetails.create({
            bloodPressure: bloodPressure,
            heartRate: heartRate,
            weight: weight,
            height: height,
            emergencyContactNo: emergencyContactNo,
            prescription: uploadedImage.secure_url,
        })

        // update the patient model by adding the patientDetails
        const updatedUserData = await User.findByIdAndUpdate(
            {_id: patientId},
            {
                $push: {
                    patientData: patientData._id,
                }
            },
            {new: true},
        ).populate("patientData").exec();

        res.status.json({
            success: true,
            message: "Patient data added successfully",
            data: updatedUserData,
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in updating Patient Details",
        })
    }
}

// edit patient data
exports.editPatientData = async(req, res) => {
    try {
        const patientId = req.user.id;

        // get image file
        const image = req.files.image;

        // get data from the user
        const {bloodPressure, heartRate, weight, height, emergencyContactNo} = req.body;

        const patientDetails = await User.findById(patientId, {
            role: "patient",
        });

        // upload image to cloudinary
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        console.log(uploadedImage);

        const updatedPatientData = await PatientDetails.findByIdAndUpdate(
            {_id: patientDetails.patientData._id},
            {
                bloodPressure: bloodPressure,
                heartRate: heartRate,
                weight: weight,
                height: height,
                emergencyContactNo: emergencyContactNo,
                prescription: uploadedImage.secure_url,
            },
            {new: true});

        const updatedPatientDetails = await User.findById(patientId)
                                        .populate("patientData").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "PatientData updated successfully",
            data: updatedPatientDetails,
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Could not update patient data",
        })
    }
}
