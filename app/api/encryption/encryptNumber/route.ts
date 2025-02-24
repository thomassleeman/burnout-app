import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface EncryptedField {
  iv: string;
  encryptedData: string;
}

/**
 * Recursively encrypt all numeric fields in 'value'.
 * - If value is a number, encrypt it and return { iv, encryptedData }.
 * - If value is an object, recurse into each property.
 * - Otherwise, return value as is.
 */
function encryptNestedNumbers(value: any, key: Buffer): any {
  if (typeof value === "number") {
    // This is a numeric field. Encrypt it.
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted =
      cipher.update(String(value), "utf8", "hex") + cipher.final("hex");

    return {
      iv: iv.toString("hex"),
      encryptedData: encrypted,
    } as EncryptedField;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    // This is a plain object. Recurse into its properties.
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = encryptNestedNumbers(v, key);
    }
    return result;
  } else {
    // Arrays, strings, booleans, etc.
    // If you need to handle them differently, do so here.
    return value;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { numberInputs } = body;

    if (!numberInputs || typeof numberInputs !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid 'numberInputs' object" },
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

    // Recursively encrypt all numeric fields
    const encryptedData = encryptNestedNumbers(numberInputs, encryptionKey);

    return NextResponse.json(encryptedData);
  } catch (error) {
    console.error("Error in encryptNumber route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// // A small helper type for the encrypted fields
// interface EncryptedField {
//   iv: string;
//   encryptedData: string;
// }

// function encryptNestedNumbers(value: any, key: Buffer): any {
//   if (typeof value === "number") {
//     // Encrypt a numeric value
//     const iv = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
//     const encrypted =
//       cipher.update(String(value), "utf8", "hex") + cipher.final("hex");

//     // Return the encrypted object
//     const encryptedField: EncryptedField = {
//       iv: iv.toString("hex"),
//       encryptedData: encrypted,
//     };
//     return encryptedField;
//   } else if (
//     value !== null &&
//     typeof value === "object" &&
//     !Array.isArray(value)
//   ) {
//     // Recursively process each property
//     const result: Record<string, any> = {};
//     for (const [k, v] of Object.entries(value)) {
//       result[k] = encryptNestedNumbers(v, key);
//     }
//     return result;
//   } else {
//     // For arrays, strings, booleans, etc., you can decide what to do.
//     // Here, we'll just return them as is. If you need text encryption,
//     // do that with a separate route or logic.
//     return value;
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { numberInputs } = body;

//     if (!numberInputs || typeof numberInputs !== "object") {
//       return NextResponse.json(
//         { error: "Missing or invalid 'numberInputs' object" },
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

//     // Recursively encrypt all numeric fields in the entire object
//     const encryptedData = encryptNestedNumbers(numberInputs, encryptionKey);

//     return NextResponse.json(encryptedData);
//   } catch (error) {
//     console.error("Error in encryptNumber route:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
