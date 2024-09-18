import express from "express"
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js"
const app = express();


import connectDb from "./config/dbConnection.js";

const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());

app.use('/api/userdata', userRoutes);
app.get('/',(req,res)=>{
  res.send("hello")
})




app.listen(PORT,()=>{
    console.log(`RUNNING OVER ${PORT}`);
})