import dotenv from "dotenv";
import readline from "readline";
import Userdata from "./models/Userdata.js";
import connectDb from "./config/dbConnection.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Load environment variables
dotenv.config();

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Connect to MongoDB
connectDb();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get user data, generate summary, and engage in conversation
async function getUserAndGenerateSummary(name) {
  try {
    // Search for user by name
    const userdata = await Userdata.findOne({ name });
    if (!userdata) {
      console.log("User not found.");
      return;
    }

    // Prepare prompt for generative AI model
    const prompt = `
"Act as an Expert Doctor (ED) with over 20 years of experience. ED will analyze provided symptoms, predict probable diseases, give a clear diagnosis, and recommend treatments. ED will also suggest routine checkups, preventive measures, and health guidance.

ED focuses on providing accurate, actionable advice for maintaining long-term health. ED can predict diseases based on input and will ask follow-up questions if needed for clarity.

ED's motto is 'PREVENTION IS BETTER THAN CURE.'

First task: Based on the symptoms provided, predict probable diseases, give a diagnosis, and recommend treatment and prevention." make sure that you never tell that i dont know or i dont have expertise, if user have a dermatolgy problem also solve and do the same"
    Name: ${userdata.name}
    Age: ${userdata.age}
    Gender: ${userdata.gender}
    Weight: ${userdata.weight}
    Height: ${userdata.height}
    Smoking: ${userdata.smoking}
    Alcohol: ${userdata.alcohol}
    Exercise Frequency: ${userdata.exerciseFrequency}
    Chronic Conditions: ${userdata.chronicConditions}
    Current Medications: ${userdata.currentMedications}
    Symptoms: ${userdata.symptoms}
    Sleep Hours: ${userdata.sleephours}
    Allergies: ${userdata.allergies}
    Family History: ${userdata.familyHistory}
    Last Checkup Date: ${userdata.lastCheckupDate}
    Note: ${userdata.note}
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

    // Create a .txt file and write the summary to it
    const fileName = `${userdata.name.replace(/\s+/g, '')}.txt`; // Remove spaces in the file name
    fs.writeFileSync(fileName, summary, 'utf-8');
    console.log(`Summary written to ${fileName}`);

    // Start conversation loop
    engageInConversation(userdata);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to engage in follow-up conversation after generating the summary
async function engageInConversation(userdata) {
  rl.question("Do you want further health advice or diagnosis? (yes/no): ", async (answer) => {
    if (answer.toLowerCase() === "yes") {
      // Ask follow-up questions
      console.log("Please answer the following questions to provide more details:");
      
      rl.question("1. Is your cough dry or productive (bringing up phlegm)? Have you noticed any changes in the color of your phlegm? ", async (coughAnswer) => {
        userdata.coughDetails = coughAnswer;
        
        rl.question("2. How often do you feel nauseous? Is it related to meals, specific foods, or activities? ", async (nauseaAnswer) => {
          userdata.nauseaDetails = nauseaAnswer;
          
          rl.question("3. How often do you feel dizzy? Is it a spinning sensation, lightheadedness, or something else? ", async (dizzinessAnswer) => {
            userdata.dizzinessDetails = dizzinessAnswer;
            
            rl.question("4. Have you sought treatment for the ringworm around your neck? If so, what treatment have you received? ", async (ringwormAnswer) => {
              userdata.ringwormTreatment = ringwormAnswer;
              
              rl.question("5. How long are your sleep cycles when you do sleep? Are you feeling excessively tired during the day? ", async (sleepAnswer) => {
                userdata.sleepDetails = sleepAnswer;
                
                // Prepare follow-up prompt for AI model
                const followUpPrompt = `
                  You previously analyzed the health of a patient named ${userdata.name}.
                  Now focus on the following additional details:
                  - Cough details: ${userdata.coughDetails}
                  - Nausea details: ${userdata.nauseaDetails}
                  - Dizziness details: ${userdata.dizzinessDetails}
                  - Ringworm treatment: ${userdata.ringwormTreatment}
                  - Sleep details: ${userdata.sleepDetails}
                  
                  Provide additional detailed insights, including:
                  - Possible causes
                  - Suggested treatments
                  - Preventive measures
                `;
                
                // Generate follow-up content
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await model.generateContent(followUpPrompt);
                const followUpResponse = await result.response.text();
                
                console.log("Follow-up advice:", followUpResponse);
                
                // Loop the conversation
                engageInConversation(userdata);
              });
            });
          });
        });
      });
    } else {
      console.log("Okay, ending the conversation. Have a great day!");
      rl.close(); // End the conversation loop
    }
  });
}

// Initial prompt to enter the name of the user
rl.question("Enter the name of the user: ", (name) => {
  getUserAndGenerateSummary(name);
});
