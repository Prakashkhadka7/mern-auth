import express from 'express';
import mongoose from 'mongoose';
import donenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


donenv.config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO).then(()=> {
    console.log('Connected to MongoDB');
}).catch((error)=> {
    console.log(error);
});

const app = express();
app.use(express.json());
app.listen(port ,()=> {
    console.log(`Server listening on port ${port}!`);
})


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)