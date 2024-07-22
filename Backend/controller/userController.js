import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary';

export const patientRegister = catchAsyncError(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic, role} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please fill the full form!", 400));
    }
    const user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User Already Registered", 400));
    }
    user = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role});
    generateToken(user, "User Registered", 200, res);
});

export const login = catchAsyncError(async(req, res, next) => {
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all details", 400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm password do not match!", 400));
    }
    const user = await User.findOne({email}).select("+password");
    //console.log(user)
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Password does not match!", 400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!", 400));
    }
    generateToken(user, "User Login Successfully", 200, res);
})

export const addNewAdmin = catchAsyncError(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, nic} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please fill the full form!", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exits`));
    }
    const admin = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin",});
    res.status(200).json({
        success: true,
        message: "New Admin Registered",
    })
})

export const getAllDoctors = catchAsyncError(async(req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    })
})

export const getUserDetails = catchAsyncError(async(req, res, next)=> {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})

export const logoutAdmin = catchAsyncError(async(req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin logged out successfully",
    })
})

export const logoutPatient = catchAsyncError(async(req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Patient logged out successfully",
    })
})

export const logoutDoctor = catchAsyncError(async(req, res, next) => {
    res.status(200).cookie("doctorToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Doctor logged out successfully",
    })
})

export const addNewDoctor = catchAsyncError(async(req,res, next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    //console.log(docAvatar);
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported", 400));
    }
    const {firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment} = req.body;
    //console.log(req.body);
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("Please provide full details", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }
    const coludinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );
    if(!coludinaryResponse || coludinaryResponse.error){
        console.error("Cloudinary Error: ",
        coludinaryResponse.error || "Unknown Cloudinary Error"
    );
    }
    const doctor = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        nic, 
        doctorDepartment, 
        role: "Doctor", 
        docAvatar:{
            public_id: coludinaryResponse.public_id,
            url: coludinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor
    });
})

export const updateDoctor = catchAsyncError(async(req, res, next) => {
    const id = req.params.doctorId;
    const payload = req.body;
    try {
      await User.findByIdAndUpdate({ _id: id }, payload);
      const doctor = await User.findById(id);
      if (!doctor) {
        return res
          .status(404)
          .send({ message: `Doctor with id ${id} not found` });
      }
      res.status(200).send({ message: `Doctor Updated`, user: doctor });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Update." });
    }
})

