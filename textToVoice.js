/* Script for manually creating audio from text using the openai api. 1. Update filename to match the article slug. 2.Update text to match the content of the article. 3.Run the script with the command; node textToVoice.js The file appears on desktop. Articles over 4096 characters will fail due to api limitations. These will need to be split to create multiple audio files (with different names otherwise it won't create the file) and then combined, for example by simply dragging the second audio file to the end of the first in audacity.*/
const os = require("os");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const fileName = "what-is-burnout";

const speechFile = path.join(os.homedir(), "Desktop", `${fileName}.mp3`);

const text = `Burnout is a state of physical or mental exhaustion brought on by prolonged or repeated stress. Common signs include:

Feeling mentally or physically drained: Lacking energy at the start of the working day and feeling used up by the end.
Detachment from work: Feeling indifferent or even cynical about your work and day-to-day tasks. Sometimes described as a feeling of being on “autopilot.”
Emotional Struggles: Difficulties in managing emotions and reactions. Frequent feelings of frustration, anger, or sadness.
Difficulty concentrating: Feeling continually scattered and distracted. Challenges in thinking clearly, remembering things, or maintaining focus.
Low Achievement: Struggling to complete tasks and get anything done.
Generally speaking, someone who is continually mentally and physically exhausted is burned out. However, it is vital to see burnout as a spectrum and not an on/off switch - think of it as a sliding scale that we all sit on to varying degrees. For instance, you might be productive and enthusiastic about your work but feel drained by the end of the day and struggle to recover for the next day. Or, you might have enough energy each day but feel detached from your work. These may not spell “burnout”, but may indicate that you are on the path to it.

If left unchecked, these feelings can snowball. Continuous stress can amplify mental exhaustion, impairing one’s ability to think clearly and manage emotionally. Over time, this can erode one’s self-belief and optimism for the future. As a self-defence, one may distance oneself, or mentally detach from their work, but this often compounds the issue as it damages motivation while challenges mount, creating a vicious cycle. If not recognized and successfully managed these feelings can pave the way for not just burnout but more severe mental health issues like depression, anxiety and addiction.

However, there is a silver lining. Recognizing and addressing stress can be a chance for much personal growth. Instead of a vicious cycle leading a person into an occupational and mental health crisis, effectively managing work-related stress can promote learning, resilience, confidence and optimism. Rather than breaking someone down, it can build a person up, potentially beyond what they ever thought could be possible. As Friedrich Nietzsche insightfully put it:

Out of Life's school of war - what doesn't kill me, makes me stronger Friedrich Nietzsche

To start your journey towards better stress management and growth, consider evaluating where you stand with our test.`;

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "alloy",
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();
