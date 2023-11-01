import { adminInit } from "@/firebase/auth/adminConfig";
const { getFirestore } = require("firebase-admin/firestore");
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studyId = searchParams.get("studyId");

  if (!studyId) {
    return NextResponse.json({
      error: "Missing or invalid study ID parameter",
    });
  }

  adminInit();
  const db = getFirestore();
  const studyRef = db.collection("research-studies").doc(studyId);
  const doc = await studyRef.get();

  if (!doc.exists) {
    return NextResponse.json({ error: "No such study!!!!!!!" });
  } else {
    const studyData = doc.data();
    return NextResponse.json(studyData);
  }
}
