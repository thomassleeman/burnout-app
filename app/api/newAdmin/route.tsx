import { adminInit } from '@/firebase/auth/adminConfig';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'firebase-admin';
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
//   Filter,
// } = require('firebase-admin/firestore');

adminInit();
// const db = getFirestore();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, id } = body;
    if (!name || !id) {
      return NextResponse.json(
        { error: 'Missing name or id' },
        { status: 400 }
      );
    }
    // const userRef = db.collection('users').doc(id);
    // const doc = await userRef.get();
    // console.log('doc', doc);
    // if (doc.displayName.stringValue !== name) {
    //   console.log('doc.displayName', doc.displayName);
    //   console.log('name', name);
    //   return NextResponse.json(
    //     {
    //       error:
    //         'The name given does not match the record we hold. The name must be an exact match to update the user to Admin',
    //     },
    //     { status: 400 }
    //   );
    // }

    const createNewAdmin = await auth().setCustomUserClaims(id, {
      admin: true,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('******Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
