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
    addDoctorDetails,
    updatedDoctorDetails,
    fetchDoctorDetails,
} = require("../controller/DoctorDetails");

const { addPatientData, editPatientData } = require("../controller/PatientDetails");

//routes mapping
//Profile page routes
router.post('/login', login)
router.get('/doctors', getAllDoctors)

// Appointment Scheduling routes
router.post('/appointment/book', bookAppointment)

// patiend data routes
router.post("/user/patientData/", auth, addPatientData);
router.put("/user/editPatientData", auth, editPatientData);

router.post('/signout', Signout);

// Doctor Details Route
router.post("/user/add-doctor-data", auth, addDoctorDetails);
router.put("/user/edit-doctor-data", auth, updatedDoctorDetails),
router.get("/user/fetch-doctor-data", auth, fetchDoctorDetails);

module.exports = router
