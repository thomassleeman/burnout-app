import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();
  console.log("content from route.ts", content);
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "alloy",
      input: content,
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  } catch (error) {
    console.error(error);
    return null;
  }
}
