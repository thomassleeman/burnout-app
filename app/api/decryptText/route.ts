// const crypto = require("crypto");

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest, response: NextResponse) {
//   try {
//     const body = await request.json();
//     const { encryptedData } = body;

//     if (!encryptedData) {
//       return NextResponse.json(
//         { error: "decryption: Missing encrypted data" },
//         { status: 400 }
//       );
//     }

//     const ivHex = body.iv;
//     if (!ivHex) {
//       return NextResponse.json(
//         { error: "decryption: Missing initialization vector" },
//         { status: 400 }
//       );
//     }

//     const encryptedText = body.encryptedData;
//     if (!encryptedText) {
//       return NextResponse.json(
//         { error: "decryption: Missing encrypted data" },
//         { status: 400 }
//       );
//     }

//     const hexKey = process.env.ENCRYPTION_KEY || "";

//     const decipher = crypto.createDecipheriv(
//       "aes-256-cbc",
//       Buffer.from(hexKey, "hex"),
//       Buffer.from(ivHex, "hex")
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

const nodeCrypto = require("crypto");
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { iv, encryptedData } = body;

    if (!iv || !encryptedData) {
      return NextResponse.json(
        { error: "Missing IV or encrypted data" },
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

    // Convert the hexadecimal key and IV to buffers
    const encryptionKey = Buffer.from(hexKey, "hex");
    const ivBuffer = Buffer.from(iv, "hex");

    const decipher = nodeCrypto.createDecipheriv(
      "aes-256-cbc",
      encryptionKey,
      ivBuffer
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return NextResponse.json({ decryptedData: decrypted });
  } catch (error) {
    console.error("******Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
