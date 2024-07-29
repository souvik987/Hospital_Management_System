import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import messageRouter from './router/messageRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import paymentRouter from "./router/PaymentsRoute.js";
import prescriptionRouter from "./router/PrescriptionsRoute.js";
import reportRouter from "./router/ReportsRoute.js";

const app = express();
config({path: "./config/config.env"});

const allowedOrigins = [process.env.FRONTEND_URL, process.env.DASHBOARD_URL];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/prescriptions", prescriptionRouter);
app.use("/api/v1/reports", reportRouter);

dbConnection();

app.get('/', (req, res) => {
    res.send('Welcome to the Hospital Management System API');
});

app.use(errorMiddleware)

export default app;