import { NextResponse } from 'next/server';
import { prisma } from '../../../../server/db/client';
import bcrypt from "bcrypt"
export async function POST(req: Request, res: Response) {
  try {
    let { username, pw, email } = await req.json();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pw, salt);
    pw = hash
    const data = await prisma.userdata.create({
      data: { username, pw, email },
    });
    return NextResponse.json({ isCreate: true });
  } catch (error:any) {
    console.log(error);
    if (error.code === 'P2002') {
      return NextResponse.json({ isCreate: false }, { status: 404 });
    } else {
      console.error('Error creating user:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}


