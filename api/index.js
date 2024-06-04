import express from 'express';
import mongoose from 'mongoose';
import donenv from 'dotenv';

donenv.config();

mongoose.connect(process.env.MONGO).then(()=> {
    console.log('Connected to MongoDB');
}).catch((error)=> {
    console.log(error);
});
const app = express();
app.listen(()=> {
    console.log('Server listening on port 3000!')
})