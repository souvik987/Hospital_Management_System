import express from 'express';
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutDoctor, logoutPatient, patientRegister, updateDoctor } from '../controller/userController.js';
import { isAdminAuthenticated, isAuthenticated, isDoctorAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/patient/register", patientRegister)
router.post("/login", login);
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
// router.get("/me", isAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/doctor/me", isDoctorAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/doctor/logout", isDoctorAuthenticated, logoutDoctor);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.put("/doctor/:doctorId", isDoctorAuthenticated, updateDoctor);

export default router;