const User = require('../models/User');
const DoctorDetails = require('../models/DoctorDetails');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    // Extract user IDs for fetching additional doctor details
    const userIds = doctors.map((doctor) => doctor._id);

    // Fetch additional details from DoctorDetails using userId
    const doctorDetails = await DoctorDetails.find({ userId: { $in: userIds } });

    // Merge the User data with DoctorDetails
    const detailedDoctors = doctors.map((doctor) => {
      const details = doctorDetails.find((detail) => detail.userId.toString() === doctor._id.toString());
      return {
        ...doctor.toObject(),
        additionalDetails: details || null, // Include additional details if available
      };
    });

    // Return the merged list of doctors
    return res.status(200).json({
      success: true,
      doctors: detailedDoctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
  }
};
