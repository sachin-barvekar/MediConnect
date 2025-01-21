const express = require('express')
const router = express.Router()

const { login } = require('../controller/Auth')
const { bookAppointment, getAppointmentsByUserId } = require('../controller/Appointment')
const { getAllDoctors } = require('../controller/Users')
const { addDoctorDetails, fetchDoctorDetails } = require('../controller/DoctorDetails')


router.post('/login', login)

router.get('/doctors', getAllDoctors)
router.post('/doctor-profile/:id', addDoctorDetails)
router.get('/doctor-profile/:id', fetchDoctorDetails);

router.post('/appointment/book', bookAppointment)
router.get("/appointments/:userId", getAppointmentsByUserId);


module.exports = router
