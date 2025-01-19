const DoctorDetails = require('../models/DoctorDetails');

exports.addDoctorDetails = async (req, res) => {
  try {
    // Destructuring the data sent in the body
    const {
      userId,
      profileImg,
      specialization,
      description,
      contactNumber,
      hospitalName,
      streetName,
      city,
      state,
      pinCode,
    } = req.body;

    // Validate if required fields are missing
    if (
      !userId ||
      !specialization ||
      !description ||
      !contactNumber ||
      !hospitalName ||
      !streetName ||
      !city ||
      !state ||
      !pinCode
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Create a new DoctorDetails document
    const doctorDetails = new DoctorDetails({
      userId,
      profileImg, // Optional, may not be passed in every time
      specialization,
      description,
      contactNumber,
      hospitalName,
      address: {
        streetName,
        city,
        state,
        pinCode,
      },
    });

    // Save the new doctor details to the database
    const response = await doctorDetails.save();

    // Return success response
    return res.status(200).json({
      success: true,
      data: response,
      message: 'Doctor details added successfully.',
    });
  } catch (error) {
    console.error('Error adding doctor details:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in adding doctor details.',
      error: error.message,
    });
  }
};

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