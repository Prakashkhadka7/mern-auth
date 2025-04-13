import express from 'express';
import mongoose from 'mongoose';
import donenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import imageRoutes from './routes/image.route.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from 'path';


donenv.config();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO).then(()=> {
    console.log('Connected to MongoDB');
}).catch((error)=> {
    console.log(error);
});
const __dirname = path.resolve();
const app = express();
// serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

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