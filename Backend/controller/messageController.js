import {catchAsyncError} from '../middlewares/catchAsyncErrors.js';
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncError( async (req, res, next) => {
    const {firstName, lastName, email, phone, message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
       return next(new ErrorHandler("Please fill full form!", 400))
    }
    try {
        await Message.create({ firstName, lastName, email, phone, message });
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.error("Error sending message:", error);
        return next(new ErrorHandler("Error sending message", 500));
    }
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
    const message = await Message.find();
    res.status(200).json({
        success: true,
        message,
    })
})