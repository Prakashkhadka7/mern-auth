import express from 'express';
import mongoose from 'mongoose';
import donenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import imageRoutes from './routes/image.route.js';
import cors from "cors";
import cookieParser from 'cookie-parser';


donenv.config();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO).then(()=> {
    console.log('Connected to MongoDB');
}).catch((error)=> {
    console.log(error);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(port ,()=> {
    console.log(`Server listening on port ${port}!`);
})


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);


app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode : statusCode
    });
})