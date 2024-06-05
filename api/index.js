import express from 'express';
import mongoose from 'mongoose';
import donenv from 'dotenv';
import userRoutes from './routes/user.route.js';


donenv.config();
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO).then(()=> {
    console.log('Connected to MongoDB');
}).catch((error)=> {
    console.log(error);
});
const app = express();
app.listen(port ,()=> {
    console.log('Server listening on port 3000!')
})


app.use("/api/user", userRoutes)