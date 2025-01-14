const express = require('express')
const router = express.Router()

const { login } = require('../controller/Auth')
const {
  auth,
  isCommunityOrganization,
  isCommunityBusinessOrOrganization,
} = require('../middleware/auth')
const { Signout } = require('../controller/Signout')

// appointment controllers
const {
  bookAppointment
} = require('../controller/Appointment')

const {
  addPatientData,
  editPatientData,
  deletePatientData,
} = require('../controller/PatientDetails')
const { getAllDoctors } = require('../controller/Users')

//routes mapping
//Profile page routes
router.post('/login', login)
router.get('/doctors', getAllDoctors)

// Appointment Scheduling routes
router.post('/appointment/book', bookAppointment)

// patiend data routes
router.post('/user/patientData/', auth, addPatientData)
router.put('/user/editPatientData', auth, editPatientData)
// router.delete("/user/deletePatientData", auth, deletePatientData);

router.post('/signout', Signout)

module.exports = router
