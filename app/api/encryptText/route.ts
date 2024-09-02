const nodeCrypto = require("crypto");

import { NextRequest, NextResponse } from "next/server";

interface EncryptedResponse {
  iv: string;
  encryptedData: string;
}

interface EncryptedResponses {
  [key: string]: EncryptedResponse;
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { userInputs } = body; // Updated to handle userInputs object

    if (!userInputs || typeof userInputs !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid User Inputs" },
        { status: 400 }
      );
    }

    const hexKey = process.env.ENCRYPTION_KEY || "";

    if (!hexKey) {
      return NextResponse.json(
        { error: "Encryption key is missing" },
        { status: 500 }
      );
    }

    const encryptedResponses: EncryptedResponses = {};

    // Encrypt each user input separately
    for (const key in userInputs) {
      if (userInputs.hasOwnProperty(key)) {
        const userInput = userInputs[key];

        // Generate a random initialization vector
        const iv = nodeCrypto.randomBytes(16);

        // Convert the hexadecimal key to a binary buffer
        const encryptionKey = Buffer.from(hexKey, "hex");
        const cipher = nodeCrypto.createCipheriv(
          "aes-256-cbc",
          encryptionKey,
          iv
        );
        let encrypted = cipher.update(userInput, "utf8", "hex");
        encrypted += cipher.final("hex");

        // Store the encrypted data and iv for each key
        encryptedResponses[key] = {
          iv: iv.toString("hex"),
          encryptedData: encrypted,
        };
      }
    }

    return NextResponse.json(encryptedResponses);
  } catch (error) {
    console.error("******Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
