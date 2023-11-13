import { cookies } from 'next/headers'
import { prisma } from "../../server/db/client"
import EditUser from './editUser'


const Profile = async() => {
    const id = Number(cookies().get('user_id').value)
    const data = await prisma.userdata.findFirst({
        where:{
            user_id:id
        }
    })
    console.log(data)
    return(
        <div>
            <EditUser data={data}/>
            <p>{data.username}</p>
        </div>
    )
}

export default Profile