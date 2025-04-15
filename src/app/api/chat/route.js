import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash"; // If this model fails, try an alternative such as "gemini-1.0-pro"

export async function GET(req) {
  try {
    if (!API_KEY) {
      throw new Error("Missing GEMINI_API_KEY environment variable.");
    }
    
    // Initialize the API client with your API key
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Prepare a simple prompt/message
    const prompt = "Hello, how are you?";
    
    // Call generateContent with a simple generation configuration
    const result = await model.generateContent(prompt);
    
    // Extract the response text
    const responseText = await result.response.text();
    console.log("Response from Gemini API:", responseText);
    
    return new Response(responseText, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response("Error: " + error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}