import { prisma } from '../../../server/db/client'
import { NextResponse } from 'next/server'


//get all the data from data base
export async function GET() {
    const data = await prisma.gamedata.findMany()
    return NextResponse.json({ data })
}

export async function POST(request) {
    const { data } = await request.json()
    try {
        const createData = await prisma.gamedata.create({
            data
        })
        return NextResponse.json({ Create: true })     
    } catch (error) {
        console.log(error)
        return NextResponse.json({Create: false},{status:500})
    }
}


//edit data from gamedata table
export async function PUT(request) {
    const { session_id, data }= await request.json()
    try {
        const dataInput = await prisma.gamedata.update({
            where:{
                session_id: session_id,
            },
            data
        })
        return NextResponse.json({ Edit:true })
    } catch (error) {
        return NextResponse.json({Edit: false},{status:500})
    }
}

//delete the select data
export async function DELETE(request) {
    const session_id = await request.json()
    const data = await prisma.gamedata.delete({
        where:session_id
    })
    return NextResponse.json({ data })
}

