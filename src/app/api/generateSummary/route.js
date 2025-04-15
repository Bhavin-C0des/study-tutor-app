import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return new Response("Missing text", { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `
      You are an AI study tutor in my SaaS that creates summaries for students.
      I will provide you with some notes uploaded by the student, and you will create a summary based on them to help the student revise and study their notes properly.
      Please make sure that the summary is concise and relevant to the notes provided.
      I need you to just directly start of the summary without any additional text or explanation since i'm just going to be taking your output and displaying it to the user as a summary since this is for an app to create summaries based on the user's notes from school or wherever.
      So please also give it in a proper format that is easy to read and understand.
      Here are the notes provided by the student:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const summary = await result.response.text();

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    return new Response("Error generating summary: " + error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}