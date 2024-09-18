 import dotenv from "dotenv";

import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

// Set the mediaPath to your desktop
const mediaPath = "C:/Users/sauga/OneDrive/Desktop"; // Adjust based on your OS

// Initialize File Manager with API Key
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

// Upload the image (x-ray.jpg) from your desktop
const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/ricord.png`,
  {
    mimeType: "image/jpeg",
    displayName: "Patient Report",
  },
);

// Log the response URI and display name
console.log(
  `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
);

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generate content based on the image
const result = await model.generateContent([
  "You are a doctor with 20+ years of experience. Your task is to analyze only the medical documents provided by the patient. Based on the documents, you will:Review and interpret the findings. Provide a diagnosis or possible health concerns. Summarize the patient's health status. Recommend next steps (further tests, follow-ups, or specialist consultations). Focus only on the information in the documents. No assumptions beyond the provided data.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);

// Log the generated text response
console.log(result.response.text());