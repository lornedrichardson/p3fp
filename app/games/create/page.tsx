import Input from "./input"
import { cookies } from 'next/headers'

function Page() {
  const auth = cookies().get('user_id').value
  return (
    <div>
      <Input auth={auth}/>
    </div>
  )
}

export default Page