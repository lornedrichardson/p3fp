import { NextResponse } from 'next/server'
import { prisma } from '../../../../server/db/client'

export async function POST(req) {
    const { username, password } = await req.json()
    try {
        const data = await prisma.userdata.create({
            data: { username, pw: password }
        })
        return NextResponse.json({isCreate: true })
    } catch (error) {
        if (error.code === "P2002") {
            return NextResponse.json({isCreate: false },{status:404})
        } else {
            return NextResponse.json({error },{status:500})
        }
    }
}