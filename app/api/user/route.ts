import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '../../../server/db/client';

export async function GET(req: Request , res: Response) {
    try {
        const data = await prisma.userdata.findMany();
        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error retrieving data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request, res: Response) {
    try {
        const { username, pw, email } = await req.json()
        if (email) {
            var foundUser = await prisma.userdata.findMany({
                where: { email },
            });
        }
        else if (username !== undefined && pw !== undefined) {
            var foundUser = await prisma.userdata.findMany({
                where: { username, pw },
            });
        }
        if (foundUser.length) {
            cookies().set('user_id', String(foundUser[0].user_id));
            cookies().set('user_name', String(foundUser[0].username));
            return NextResponse.json({ isLogin: true });
        } else {
            return NextResponse.json({ isLogin: false });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ isLogin: false }, { status: 500 });
    }
}

export async function PUT(req: Request, res: Response) {
    const { user_id, data }= await req.json()
    console.log(data,user_id)
    cookies().set('user_name', String(data.username));
    try {
        const dataInput = await prisma.userdata.update({
            where:{
                user_id: user_id,
            },
            data
        })
        return NextResponse.json({ Edit:true })
    } catch (error) {
        return NextResponse.json({Edit: false},{status:500})
    }
}

export async function DELETE(req: Request, res: Response) {
    try {
        cookies().delete("user_id");
        cookies().delete("user_name");
        return NextResponse.json({ isSignOut: true });
    } catch (error) {

    }
}