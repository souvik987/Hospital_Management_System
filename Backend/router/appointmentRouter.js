import express from "express";
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isAuthenticated, isDoctorAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAuthenticated, getAllAppointment);
router.put("/update/:id", isAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAuthenticated, deleteAppointment);

export default router;

