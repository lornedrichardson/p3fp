import { cookies } from 'next/headers'
import { prisma } from '../../../../server/db/client'
import Input from './input'
import { redirect } from 'next/navigation'

async function Page({ params }: { params: { id: number } }) {
    const session = Number(params.id)
    const dataGetFromParams = await prisma.gamedata.findFirst({
        where: { session_id: session}
    })
    if(dataGetFromParams){
    console.log(dataGetFromParams)
    const auth = cookies().get('user_id').value
    return (
        <div>
            <Input data={dataGetFromParams} session={session} auth={auth} superjson/>
        </div>
    )
}else{
    redirect('/games')
}
}

export default Page