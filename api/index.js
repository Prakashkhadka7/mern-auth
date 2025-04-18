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
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API routes with dedicated prefix
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

// Database connection
mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Frontend serving logic (separate from API concerns)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

// This catch-all should only handle non-API routes
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});