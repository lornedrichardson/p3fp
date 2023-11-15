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
    console.log(data.username)
    return(
        <div>
            <EditUser data={data} id={id}/>
            <p>{data.username}</p>
        </div>
    )
}

export default Profile