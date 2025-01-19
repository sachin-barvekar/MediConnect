const mongoose = require('mongoose');

const doctorDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    specialization: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length === 10; // Ensure exactly 10 digits
            },
            message: "No. must be 10 digits long",
        },
    },
    hospitalName: {
        type: String,
        required: true,
    },
    address: {
        streetName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        State: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true,
            validate: {
                validator: function (v) {
                    return v.toString().length === 6; // Ensure exactly 6 digits
                },
                message: "Pincode must be 6 digits long",
            },
        }
    }
})

const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema);
module.exports = DoctorDetails;
