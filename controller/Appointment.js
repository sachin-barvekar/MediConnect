const User = require("../models/User")
const Appointment = require("../models/Appointment")

// Booked appointment handler function
exports.bookedAppointment = async (req, res) => {
    // Get UserId
    const patientId = req.user.id;

    // Fetch data
    const {doctorId, date, time, status} = req.body;

    // validate the data
    if(!doctorId || !date || !time) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    // // check for the appointment status
    // if(!status || status === undefined) {
    //     status = "Create"
    // }

    // Check user is present or not
    const patientDetails = await User.findById(patientId, {role: "patient"});

    if(!patientDetails) {
        return res.status(404).json({
            success: false,
            message: "User Details are not found",
        })
    }

    // check the doctor is present or not
    const doctorDetails = await User.findById(doctorId, {role: "doctor"});

    if(!doctorDetails) {
        return res.status(404).json({
            success: false,
            message: "Doctor not found",
        })
    }

    // Create appointment entry database
    const newAppointment = await Appointment.create({
        patient: patientDetails._id,
        doctor: doctorDetails._id,
        date: date,
        time: time,
        status: "Booked",
    })

    // Add new appointment to the patient Schema
    await User.findByIdAndUpdate(
        {_id: patientId},
        {
            $push: {
                appointments: newAppointment._id,
            }
        },
        {new: true}
    )

    // Add new appointment to the doctor schema
    await User.findByIdAndUpdate(
        {_id: doctorId},
        {
            $push: {
                appointments: newAppointment._id,
            }
        },
        {new: true}
    )

    return res.status(200).json({
        success: true,
        message: "Appointment Booked Successfully",
        data: newAppointment,
    })
}

// edit appointment
exports.editAppointment = async(req, res) => {
    try {
        const { appointmentId } = req.body;

        // fetch all the details present in the request body
        const {date, time} = req.body;

        const appointment = await Appointment.findById(appointmentId);
        
        if(!appointment) {
            return res.status(402).json({
                success: false,
                error: "Appointment not found",
            })
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            {_id: appointmentId},
            {
                date: date,
                time: time,
            }
        )
            .populate("patient")
            .populate("doctor")
            .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Appointment updated Successfully",
            data: updatedAppointment,
        })

    } catch(error) {
        res.status(401).json({
            success: false,
            message: "Error in edit appointment",
        })
    }
}

// getAllAppointments of the patient or doctor handler function
exports.getAllAppointments = async(req, res) => {
    try {
        // fetch user id from req.user
        const userDetails = req.user;

        let appointments;

        if(userDetails.role === "patient") {
            appointments = await Appointment.find({
                patient: userDetails._id,
            }).sort({createdAt: -1})
                .populate("patient")
                .populate("doctor")
                .exec();
        } else {
            appointments = await Appointment.find({
                doctor: userDetails._id,
            }).sort({createdAt: -1})
                .populate("patient")
                .populate("doctor")
                .exec();
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "All the appointments are fetched successfully.",
            data: appointments,
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message: "Cannot fetched appointments data"
        })
    }
}

// Delete appointment
exports.deleteAppointment = async(req, res) => {
    try {
        const { appointmentId } = req.body;

        // find Appointment
        const appointment = await Appointment.findById(appointmentId);

        // validation
        if(!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            })
        }

        const doctorId = appointment.doctor;
        const patientId = appointment.patient;

        // remove appointment from the doctor
        await User.findByIdAndUpdate(
            {_id: doctorId},
            { 
                $pull: {
                    appointments: appointment._id,
                }
            },
            {new: true}
        )

        // remove appointment from the patient
        await User.findByIdAndUpdate(
            {patientId},
            {
                $pull: {
                    appointments: appointment._id,
                }
            },
            {new: true}
        )

        // Delete the appointment
        await Appointment.findByIdAndDelete(appointment._id)

        // // Instead we can cancle the appointment
        // await Appointment.findByIdAndUpdate(
        //     {_id: appointment._id}, 
        //     {status: "Cancelled"},
        //     {new: true}
        // )

        // return res.status(200).json({
        //     success: true,
        //     message: "Appointment Cancelled Successfully.",
        // })
        
        return res.status(200).json({
            success: true,
            message: "Appointment deleted Successfully",
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}