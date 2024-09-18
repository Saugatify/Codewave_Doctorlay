import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const genAI=new GoogleGenerativeAI(process.env.API_KEY);
//AIzaSyBuC1qNvH9KCQxY1liPBKkjADLH7tqOY7s
async function run() {
    console.log(genAI);

    const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"});
    const prompt= "what is the capital city of france."
    const result=await model.generateContent(prompt);
    const response=await result.response;
    const text=response.text();
    console.log(text);
    
}

run();