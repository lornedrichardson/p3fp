export default function Signup (prop){
    return(
        <form>
            <label >User name</label>
            <input type="text" required/>
            <label >Password</label>
            <input type="password" required/>
            <label>Email</label>
            <input type="email" />
        </form>
    )
}