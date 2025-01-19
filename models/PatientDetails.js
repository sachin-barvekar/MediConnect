const mongoose = require("mongoose");

const patientDetailsSchema = new mongoose.Schema({
    prescription: {
        type: String,
        require: true,
    },
    bloodPressure: {
        type: Number,
        required: true,
    },
    heartRate: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    emergencyContactNo: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const PatientDetails = mongoose.model("PatientDetails", patientDetailsSchema);
module.exports = PatientDetails;