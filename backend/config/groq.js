import { ChatGroq } from "@langchain/groq";
import { config } from "dotenv";
config();

export const llm = new ChatGroq({ apiKey: process.env.API_KEY, modelName: process.env.MODEL });
