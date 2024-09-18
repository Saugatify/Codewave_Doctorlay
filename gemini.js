import dotenv from "dotenv";
import mongoose from "mongoose";
import readline from "readline";
import Userdata from "./models/Userdata.js";
import connectDb from "./config/dbConnection.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Connect to MongoDB
connectDb();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user data and generate summary
async function getUserAndGenerateSummary(name) {
  try {
    // Search for user by name
    const userdata = await Userdata.findOne({ name });
    if (!userdata) {
      console.log("User not found.");
      return;
    }

    // Prepare prompt for generative AI model
    const prompt = `act like you are a medical professional and a doctor suggest some basic health practices for the person  : 
    Name: ${userdata.name}
    Disease:${userdata.disease}
    Medicine: ${userdata.medicine}
    Dosages: ${userdata.dosages}
    Doctor: ${userdata.doctorname}
    Hospital: ${userdata.hospitalname}
    age:${userdata.age}
    bloodlevel:${userdata.bloodlevel}
    `;


      
    
    console.log("Prompt for AI Model:", prompt);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = await response.text();

    // Log the summary
    console.log("Generated Summary:", summary);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close readline interface
    rl.close();
  }
}

// Prompt user for input
rl.question('Enter the name of the user: ', (name) => {
  getUserAndGenerateSummary(name);
});
