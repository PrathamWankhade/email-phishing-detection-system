import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // In a real production app, ensure API_KEY is secure.
    // For this frontend demo, we assume it's available in env.
    const apiKey = process.env.API_KEY || ''; 
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const initializeChat = async () => {
  const ai = getClient();
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    chatSession = chat;
    return true;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }

  try {
    const result = await chatSession.sendMessage({
      message: message
    });
    return result.text || "I didn't get a response regarding that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I encountered an error while processing your request.";
  }
};