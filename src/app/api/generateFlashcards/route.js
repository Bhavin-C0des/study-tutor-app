import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    if (!API_KEY) {
      throw new Error("Missing GEMINI_API_KEY environment variable.");
    }

    const body = await req.json();
    const { text } = body;
    if (!text) {
      return new Response("Missing text", { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const prompt = `
You are an AI study tutor in my SaaS that creates flashcards for MYP students.
I will provide you with some notes uploaded by the student, and you will create flashcards based on them to help the student revise and study their notes properly.
Include questions on definitions, concepts, processes, and any other relevant information that can be turned into a question. Make this for an MYP student to score better in their MYP assessments based on the MYP crteria of that subject. Do not mention the criteria or anything in the respones, just base it on each of the criterions that you search up based on the subject for MYP. Don't only focus on the factual content like in criterion A for science. Give an equal amount of weightage for all the criteria (ex - Real life application in Maths for criteria D, variables in research for criteria B in science or real-life application for criteria D in science, etc.)
Please return ONLY the flashcards in the following JSON format (do not add any markdown formatting or extra text):
{
  "flashcards": [
    { "question": "Question 1", "answer": "Answer 1" },
    { "question": "Question 2", "answer": "Answer 2" }
  ]
}
Here are the notes provided by the student:
${text}
`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Clean up the response text by removing markdown code fences if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```json")) {
      const lines = cleanedText.split("\n");
      // Remove the first line (```json) and the last line (```)
      lines.shift();
      lines.pop();
      cleanedText = lines.join("\n").trim();
    }

    const flashcardsData = JSON.parse(cleanedText);

    return new Response(JSON.stringify(flashcardsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response("Error: " + error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}