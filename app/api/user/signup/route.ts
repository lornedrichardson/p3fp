import { NextResponse } from 'next/server';
import { prisma } from '../../../../server/db/client';
import bcrypt from "bcrypt"
export async function POST(req: Request, res: Response) {
  try {
    let { username, pw, email } = await req.json();
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(pw, salt, async function(err, hash) {
        pw = hash
        const data = await prisma.userdata.create({
          data: { username, pw, email },
        });
      });
    });
    return NextResponse.json({ isCreate: true });
  } catch (error) {
    if (error) {
      return NextResponse.json({ isCreate: false }, { status: 404 });
    } else {
      console.error('Error creating user:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}


