import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '../../../server/db/client';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await prisma.userdata.findMany();
        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error retrieving data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { username, pw , email } = await req.json()
        if(email){
            console.log(email);
            const foundUser = await prisma.userdata.findMany({
                where: { email: email},
            });
            if (foundUser.length) {
                console.log(foundUser[0].user_id)
                cookies().delete("user_id");
                cookies().set('user_id', String(foundUser[0].user_id));
                return NextResponse.json({ isLogin: true });
            } else {
                return NextResponse.json({ isLogin: false, canSignUp: true });
            }
        }
        if(username !== undefined || pw !== undefined) {
            const foundUser = await prisma.userdata.findMany({
                where: { username: username, pw: pw },
            });
            if (foundUser.length) {
                console.log(foundUser[0].user_id)
                cookies().delete("user_id");
                cookies().set('user_id', String(foundUser[0].user_id));
                return NextResponse.json({ isLogin: true });
            } else {
                return NextResponse.json({ isLogin: false });
            }
        }
        else{
            return NextResponse.json({isLogin: false})
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ isLogin: false }, { status: 500 });
    }
}
