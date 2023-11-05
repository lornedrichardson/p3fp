import { cookies } from "next/headers";
import Login from "./login";


const page = async ()=>{
    async function deleteTokens() {
        "use server";
        cookies().delete("user_id");
      }
    return(
        <Login deleteTokens={deleteTokens}/>
    )
}

export default page