const nodeCrypto = require("crypto");

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { userInput } = body;

    if (!userInput) {
      return NextResponse.json(
        { error: "Missing User Input" },
        { status: 400 }
      );
    }

    const hexKey = process.env.ENCRYPTION_KEY || "";

    // Generate a random initialization vector
    const iv = nodeCrypto.randomBytes(16);

    // Convert the hexadecimal key to a binary buffer
    const encryptionKey = Buffer.from(hexKey, "hex");
    const cipher = nodeCrypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
    let encrypted = cipher.update(userInput, "utf8", "hex");
    encrypted += cipher.final("hex");

    return NextResponse.json({
      iv: iv.toString("hex"),
      encryptedData: encrypted,
    });
  } catch (error) {
    console.error("******Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
