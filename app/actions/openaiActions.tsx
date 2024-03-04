"use server";

//openai
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export async function generateAudioFromText(content: string) {
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "alloy",
      input: content,
    });

    /* A uint8Array cannot be sent from the server component to the client component. Hence it is necessary to convert to a base64String, send that and then convert back to uint8Array on the client side.  */
    const uint8Array = Buffer.from(await response.arrayBuffer());
    let base64String = Buffer.from(uint8Array).toString("base64");
    return base64String;
  } catch (error) {
    console.error(error);
    return null;
  }
}
