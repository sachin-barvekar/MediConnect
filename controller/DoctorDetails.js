const DoctorDetails = require('../models/DoctorDetails');

// Add Doctor details
exports.addDoctorDetails = async (req, res) => {
    try {
        // fetch data from user
        const { specialization, description, contactNumber, hospitalName, pinCode, state, city, streetName } = req.body;

        const userId = req.user.id;

        if (!specialization || !description || !contactNumber || !hospitalName || !pinCode || !state || !city || !streetName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const response = DoctorDetails.create({
            userId: userId,
            specialization: specialization,
            description: description,
            contactNumber: contactNumber,
            hospitalName: hospitalName,
            streetName: address, streetName,
            state: address.state,
            city: address.city,
            pinCode: address.pinCode,
        })

        if (response) {
            return res.status(200).json({
                success: true,
                data: response.data,
                message: "Doctor details added successfully",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            error: error.message,
            message: "Error in adding doctor details"
        })
    }
}

// Update Doctor Details
exports.updatedDoctorDetails = async (req, res) => {
    try {
        // fetch data from user
        const { specialization, description, contactNumber, hospitalName, address } = req.body;

        // fetch user id
        const userId = req.user.id;

        const updatedDoctorDetails = await DoctorDetails.findOneAndUpdate({ userId: userId }, {
            specialization: specialization,
            description: description,
            contactNumber: contactNumber,
            hospitalName: hospitalName,
            streetName: address, streetName,
            state: address.state,
            city: address.city,
            pinCode: address.pinCode,
        })

        if (response) {
            return res.status(200).json({
                success: true,
                updatedDoctorDetails: updatedDoctorDetails,
                message: "Doctor details updated successfully",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error in updating doctor details",
        })
    }
}

// Fetch Doctor Details
exports.fetchDoctorDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is not present"
            })
        }

        const doctorDetails = await DoctorDetails.findOne({ userId: userId })
            .populate({ path: "userId" }).exec();

        if (doctorDetails) {
            return res.status(200).json({
                success: true,
                doctorDetails: doctorDetails,
                message: "Doctor details fetched successfully",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            error: error.message,
            message: "Error in fetching doctor details."
        })
    }
}