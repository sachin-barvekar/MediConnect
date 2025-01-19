const User = require('../models/User')

exports.getAllDoctors = async (req, res) => {
  try {
    // Find all users with the role of 'doctor'
    const doctors = await User.find({ role: 'doctor' })

    // Check if any doctors are found
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found' })
    }

    // Return the list of doctors with selected fields
    return res.status(200).json({
      success: true,
      doctors,
    })
  } catch (error) {
    console.error('Error fetching doctors:', error)
    res
      .status(500)
      .json({ message: 'Failed to fetch doctors', error: error.message })
  }
}
