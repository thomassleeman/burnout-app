// app/api/encryption/decryptNumber/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface EncryptedField {
  iv: string;
  encryptedData: string;
}

function decryptNestedNumbers(value: any, key: Buffer): any {
  // Is this a numeric-encrypted field? (An object with { iv, encryptedData })
  const isEncryptedObject =
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.iv === "string" &&
    typeof value.encryptedData === "string";

  if (isEncryptedObject) {
    const { iv, encryptedData } = value as EncryptedField;
    const ivBuffer = Buffer.from(iv, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    // Convert back to number
    return Number(decrypted);
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    // Recursively decrypt nested objects
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = decryptNestedNumbers(v, key);
    }
    return result;
  } else {
    // If it's not an encrypted numeric field or object, return as-is
    return value;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { encryptedNumberInputs } = body;

    if (!encryptedNumberInputs || typeof encryptedNumberInputs !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid 'encryptedNumberInputs' object" },
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

    // Recursively decrypt the entire structure
    const decryptedData = decryptNestedNumbers(
      encryptedNumberInputs,
      encryptionKey
    );

    return NextResponse.json(decryptedData);
  } catch (error) {
    console.error("Error in decryptNumber route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// interface EncryptedField {
//   iv: string;
//   encryptedData: string;
// }

// function decryptNestedNumbers(value: any, key: Buffer): any {
//   // Detect an "encrypted field": an object with { iv, encryptedData }
//   const isEncryptedObject =
//     value &&
//     typeof value === "object" &&
//     !Array.isArray(value) &&
//     typeof value.iv === "string" &&
//     typeof value.encryptedData === "string";

//   if (isEncryptedObject) {
//     const { iv, encryptedData } = value as EncryptedField;

//     const ivBuffer = Buffer.from(iv, "hex");
//     const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);

//     let decrypted = decipher.update(encryptedData, "hex", "utf8");
//     decrypted += decipher.final("utf8");

//     // Convert back to number
//     const asNumber = Number(decrypted);
//     return asNumber;
//   } else if (
//     value !== null &&
//     typeof value === "object" &&
//     !Array.isArray(value)
//   ) {
//     // Recursively handle nested objects
//     const result: Record<string, any> = {};
//     for (const [k, v] of Object.entries(value)) {
//       result[k] = decryptNestedNumbers(v, key);
//     }
//     return result;
//   } else {
//     // For arrays, strings, booleans, etc., return as is
//     return value;
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { encryptedNumberInputs } = body;

//     if (!encryptedNumberInputs || typeof encryptedNumberInputs !== "object") {
//       return NextResponse.json(
//         { error: "Missing or invalid 'encryptedNumberInputs' object" },
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
//     const encryptionKey = Buffer.from(hexKey, "hex");

//     // Recursively decrypt the entire structure
//     const decryptedData = decryptNestedNumbers(
//       encryptedNumberInputs,
//       encryptionKey
//     );

//     return NextResponse.json(decryptedData);
//   } catch (error) {
//     console.error("Error in decryptNumber route:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
