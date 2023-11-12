import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../server/db/client';

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { username, pw ,email } = await req.json();
    console.log(username)
    const data = await prisma.userdata.create({
      data: { username, pw, email },
    });
    return NextResponse.json({ isCreate: true });
  } catch (error) {
    console.log(error);
    if (error) {
      return NextResponse.json({ isCreate: false }, { status: 404 });
    } else {
      console.error('Error creating user:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
