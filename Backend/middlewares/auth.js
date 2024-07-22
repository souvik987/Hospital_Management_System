import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token;

  if (req.cookies.adminToken) {
    token = req.cookies.adminToken;
  } else if (req.cookies.patientToken) {
    token = req.cookies.patientToken;
  } else if (req.cookies.doctorToken) {
    token = req.cookies.doctorToken;
  }

  if (!token) {
    return next(new ErrorHandler("User not authenticated", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }
  next();
});

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
  }
  next();
});

export const isPatientAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("Patient not authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Patient") {
    return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
  }
  next();
});

export const isDoctorAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.doctorToken;
  if (!token) {
    return next(new ErrorHandler("Doctor not authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Doctor") {
    return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
  }
  next();
});
