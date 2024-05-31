import { llm } from "../config/groq.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

const prompt = PromptTemplate.fromTemplate(
   "User provides an input or just a name, Base on that input You generate multiple-choice question with only three options including one correct answer and two in-correct answers. Only extract the properties mentioned in the 'Classification' function. User's input : {input}."
);

const schema = z.object({
   question: z.string().describe("A Question based on user's provided input context."),
   choices: z
      .array(
         z.object({
            id: z.number().describe("nth number of the option. like 1 or 2 or 3"),
            answer: z.string().describe("Option, a correct answer or in-correct answer."),
            isCorrectAnswer: z.boolean().describe("If this choice is a correct answer or not."),
         })
      )
      .describe("multiple choices"),
});

const output = llm.withStructuredOutput(schema);

const chain = prompt.pipe(output);

const res = await chain.invoke({ input: "JavaScript" });

console.log(res);
