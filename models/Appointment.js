const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reason: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
  
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Create", "Booked", "Cancelled"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;