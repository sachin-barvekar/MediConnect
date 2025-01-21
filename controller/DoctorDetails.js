const { uploadImageToCloudinary } = require('../utils/imageUploader')
const DoctorDetails = require('../models/DoctorDetails')

exports.addDoctorDetails = async (req, res) => {
  try {
    // Destructuring the data sent in the body
    const jsonData = req.body.data

    // Parse the JSON string to an object
    const parsedData = JSON.parse(jsonData)
    const {
      specialization,
      description,
      contactNumber,
      hospitalName,
      streetName,
      city,
      state,
      pinCode,
      active
    } = parsedData
    const { id: userId } = req.params
    const profileImg = req.files.image

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
      })
    }

    // Upload profile image to Cloudinary if provided
    let uploadedProfileImg = null
    if (profileImg) {
      // If profileImg is provided, upload it to Cloudinary
      const uploadedImage = await uploadImageToCloudinary(
        profileImg,
        'doctor_profiles'
      )
      uploadedProfileImg = uploadedImage.secure_url // Store the image URL
    }

    // Create a new DoctorDetails document
    const doctorDetails = new DoctorDetails({
      userId,
      active,
      profileImg: uploadedProfileImg, // Use the uploaded image URL
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
    })

    // Save the new doctor details to the database
    const response = await doctorDetails.save()

    // Return success response
    return res.status(200).json({
      success: true,
      data: response,
      message: 'Doctor details added successfully.',
    })
  } catch (error) {
    console.error('Error adding doctor details:', error)
    return res.status(500).json({
      success: false,
      message: 'Error in adding doctor details.',
      error: error.message,
    })
  }
}

// Update Doctor Details
exports.updatedDoctorDetails = async (req, res) => {
  try {
    // fetch data from user
    const {
      specialization,
      description,
      contactNumber,
      hospitalName,
      address,
    } = req.body

    // fetch user id
    const userId = req.user.id

    const updatedDoctorDetails = await DoctorDetails.findOneAndUpdate(
      { userId: userId },
      {
        specialization: specialization,
        description: description,
        contactNumber: contactNumber,
        hospitalName: hospitalName,
        streetName: address,
        streetName,
        state: address.state,
        city: address.city,
        pinCode: address.pinCode,
      }
    )

    if (response) {
      return res.status(200).json({
        success: true,
        updatedDoctorDetails: updatedDoctorDetails,
        message: 'Doctor details updated successfully',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error in updating doctor details',
    })
  }
}

// Fetch Doctor Details
exports.fetchDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.',
      })
    }

    const doctorDetails = await DoctorDetails.findOne({ userId: id })
      .populate('userId')
      .exec()

    if (!doctorDetails) {
      return res.status(404).json({
        success: false,
        message: 'Doctor details not found.',
      })
    }

    return res.status(200).json({
      success: true,
      data: doctorDetails,
      message: 'Doctor details fetched successfully.',
    })
  } catch (error) {
    console.error('Error fetching doctor details:', error)
    return res.status(500).json({
      success: false,
      message: 'Error in fetching doctor details.',
      error: error.message,
    })
  }
}
