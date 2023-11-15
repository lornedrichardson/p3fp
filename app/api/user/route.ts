import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '../../../server/db/client';
import bcrypt from "bcrypt"

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
    var output_user_id
    var isInData
    var outputUsername
    try {
        const { username, pw, email } = await req.json()
        if (email) {
            const foundUser = await prisma.userdata.findFirst({
                where: { email },
            });
            if(foundUser){
                output_user_id = foundUser.user_id
                outputUsername = foundUser.username
                isInData = true
            }

        }
        else if (username !== undefined && pw !== undefined) {
            const foundUser = await prisma.userdata.findMany({
                where: { username },
            });
            var anss = foundUser.map((value,i)=>{
                let ans = bcrypt.compareSync(pw, value.pw);
                if(ans){
                    isInData = true
                    output_user_id = value.user_id
                    outputUsername = value.username
                }
            })
        }
        if (isInData) {
            cookies().set('user_id', String(output_user_id));
            cookies().set('user_name', String(outputUsername));
            return NextResponse.json({ isLogin: true });
        } else {
            if(email){
                return NextResponse.json({ isLogin: false, canSignUp:true})
            }
            return NextResponse.json({ isLogin: false });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ isLogin: false }, { status: 500 });
    }
}

export async function PUT(req: Request, res: Response) {
    try {
    const { user_id, data }= await req.json()
    cookies().set('user_name', String(data.username));
    if(data.pw){
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(data.pw, salt, async function(err, hash) {
              data.pw = hash
              const dataInput = await prisma.userdata.update({
                where:{
                    user_id: user_id,
                },
                data
            })
            });
          });
        return NextResponse.json({ Edit:true })
    }
    else{
        const dataInput = await prisma.userdata.update({
            where:{
                user_id: user_id,
            },
            data:{
                username:data.username,
                email:data.email
            }
        })
        return NextResponse.json({ Edit:true })
    }
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