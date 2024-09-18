import express from "express";
import bodyParser from 'body-parser';
import 'dotenv/config'; 
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(bodyParser.json());

// Import and configure database connection
import connectDb from "./config/dbConnection.js";
connectDb();

// Define port
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());


// Define routes
app.use('/api/userdata', userRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`RUNNING OVER ${PORT}`);
});
