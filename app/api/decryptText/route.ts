import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { encryptedInputs } = body;

    if (!encryptedInputs || !Array.isArray(encryptedInputs)) {
      return NextResponse.json(
        { error: "Missing or invalid encrypted inputs" },
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

    const encryptionKey = Buffer.from(hexKey, "hex");

    const decryptedOutputs = encryptedInputs.map((input) => {
      const { iv, encryptedData } = input;

      if (!iv || !encryptedData) {
        throw new Error("Missing IV or encrypted data in one of the inputs");
      }

      const ivBuffer = Buffer.from(iv, "hex");

      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        encryptionKey,
        ivBuffer
      );

      let decrypted = decipher.update(encryptedData, "hex", "utf8");
      decrypted += decipher.final("utf8");

      return decrypted;
    });

    return NextResponse.json({ decryptedOutputs });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// const nodeCrypto = require("crypto");
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest, response: NextResponse) {
//   try {
//     const body = await request.json();
//     const { iv, encryptedData } = body;

//     if (!iv || !encryptedData) {
//       return NextResponse.json(
//         { error: "Missing IV or encrypted data" },
//         { status: 400 }
//       );
//     }

//     const hexKey = process.env.ENCRYPTION_KEY || "";

//     if (!hexKey) {
//       return NextResponse.json(
//         { error: "Encryption key is missing" },
//         { status: 500 }
//       );
//     }

//     // Convert the hexadecimal key and IV to buffers
//     const encryptionKey = Buffer.from(hexKey, "hex");
//     const ivBuffer = Buffer.from(iv, "hex");

//     const decipher = nodeCrypto.createDecipheriv(
//       "aes-256-cbc",
//       encryptionKey,
//       ivBuffer
//     );
//     let decrypted = decipher.update(encryptedData, "hex", "utf8");
//     decrypted += decipher.final("utf8");

//     return NextResponse.json({ decryptedData: decrypted });
//   } catch (error) {
//     console.error("******Error in POST handler:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
