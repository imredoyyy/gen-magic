import { auth } from "@clerk/nextjs/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";
import { connectToDb } from "@/lib/connect-to-db";
import { checkSubscription } from "@/lib/subscription";
import { ChatHistory } from "@/lib/types";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const safetySetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySetting,
});

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string | null } = auth();
    const data = await req.json();

    const { history, prompt }: { history: ChatHistory[]; prompt: string } =
      data;

    let lastChatHistory: ChatHistory[] = [];

    if (history) {
      // Get last messages of user and model from history
      lastChatHistory = history.length > 1 ? history.slice(-2) : history;
    }

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    if (!genAi.apiKey) {
      return NextResponse.json(
        {
          error: "Gemini API Key not found!",
        },
        {
          status: 500,
        },
      );
    }

    if (!prompt) {
      return NextResponse.json(
        {
          error: "Messages are required!",
        },
        {
          status: 400,
        },
      );
    }

    await connectToDb();

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return NextResponse.json(
        { error: "Free trial limit reached!" },
        {
          status: 403,
        },
      );
    }

    const chat = model.startChat({
      // Send latest chat history, if available. So that the model can continue from where it left off.
      history: [
        {
          role: lastChatHistory.length > 0 ? lastChatHistory[0].role : "user",
          parts: [
            {
              text:
                lastChatHistory.length > 0 ? lastChatHistory[0].parts : prompt,
            },
          ],
        },
        {
          role: lastChatHistory.length > 0 ? lastChatHistory[1].role : "model",
          parts: [
            {
              text: lastChatHistory.length > 0 ? lastChatHistory[1].parts : "",
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    const text = response.text();

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(text);
  } catch (err) {
    console.log("Conversation Error:", err);
    return NextResponse.json(
      { error: `Internal Server Error, ${err}` },
      { status: 500 },
    );
  }
}
