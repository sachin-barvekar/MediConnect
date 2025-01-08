const express = require("express");
const router = express.Router();

const { login } = require("../controller/Auth");
const {getProfile} = require("../controller/Users");
const { auth, isCommunityOrganization, isCommunityBusinessOrOrganization} = require('../middleware/auth');
const {createEvent,getAllEvents,getEventById,updateEventById,deleteEventById} = require("../controller/Event");
const {Signout} = require("../controller/Signout");

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


router.post('/signout', Signout);

module.exports = router;