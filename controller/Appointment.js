const User = require("../models/User");
const Appointment = require("../models/Appointment");

// Book appointment handler function
exports.bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time, reason } = req.body;

    // Validate the data
    if (!userId || !doctorId || !date || !time || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the patient exists
    const patientDetails = await User.findById(userId);
    if (!patientDetails || patientDetails.role !== "patient") {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Check if the doctor exists
    const doctorDetails = await User.findById(doctorId);
    if (!doctorDetails || doctorDetails.role !== "doctor") {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check if the doctor is available at the given date and time
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: date,
      time: time,
      status: "Booked",
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "The doctor is not available at the selected date and time",
      });
    }

    // Create a new appointment
    const newAppointment = await Appointment.create({
      patient: userId,
      doctor: doctorId,
      date: date,
      time: time,
      reason: reason,
      status: "Booked",
    });

    // Add the appointment to the patient's record
    await User.findByIdAndUpdate(
      userId,
      { $push: { appointments: newAppointment._id } },
      { new: true }
    );

    // Add the appointment to the doctor's record
    await User.findByIdAndUpdate(
      doctorId,      
      { $push: { appointments: newAppointment._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while booking the appointment",
    });
  }
};
