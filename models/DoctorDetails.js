const mongoose = require('mongoose')

const doctorDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  active:{
    type: Boolean,
    required:true
  },
  profileImg: {
    type: String,
    required: true,
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
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v.toString().length === 6
        },
        message: 'Pincode must be 6 digits long',
      },
    },
  },
})

const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema)
module.exports = DoctorDetails
