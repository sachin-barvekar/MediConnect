const express = require("express");
const router = express.Router();

const { login } = require("../controller/Auth");
const {getProfile} = require("../controller/Users");
const { auth, isCommunityOrganization, isCommunityBusinessOrOrganization, isDoctor} = require('../middleware/auth');
const {createEvent,getAllEvents,getEventById,updateEventById,deleteEventById} = require("../controller/Event");
const {Signout} = require("../controller/Signout");

// appointment controllers
const {
    bookedAppointment,
    editAppointment,
    getAllAppointments,
    deleteAppointment
} = require("../controller/Appointment");

const {
    addDoctorDetails,
    updatedDoctorDetails,
    fetchDoctorDetails,
} = require("../controller/DoctorDetails");

const { addPatientData, editPatientData } = require("../controller/PatientDetails");

//routes mapping
//Profile page routes
router.get('/user', auth, getProfile);
router.post("/login", login);

//Events page route
router.post("/events", auth, createEvent);
router.get("/events", auth, getAllEvents);
router.get("/eventsbyuser", auth, getEventById);
router.put("/events/:id", auth, updateEventById);
router.delete("/events/:id",auth, deleteEventById);

// Appointment Scheduling routes
router.post("/appointment/book", auth, bookedAppointment);
router.put("/appointment/edit", auth, editAppointment);
router.get("/appointments", auth, getAllAppointments);
router.delete("/appointment/delete", auth, deleteAppointment);

// patiend data routes
router.post("/user/patientData/", auth, addPatientData);
router.put("/user/editPatientData", auth, editPatientData);

router.post('/signout', Signout);

// Doctor Details Route
router.post("/user/add-doctor-data", auth, addDoctorDetails);
router.put("/user/edit-doctor-data", auth, updatedDoctorDetails),
router.get("/user/fetch-doctor-data", auth, fetchDoctorDetails);

module.exports = router;