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

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
app.use(errorMiddleware)
app.get('/', (req, res) => {
    res.send('Welcome to the Hospital Management System API');
});

export default app;
