import SignUp from "./SignUp"

export default function Home(prop){
    return(
        <div>
            <img src="http://placekitten.com/g/50/50" alt="" />
            <button onClick={()=>{prop.isLogin('Login')}}>Login</button>
            <div>
                <p style={{display: 'inline-block'}}>Don't have a account? Sign up today!</p>
                <button onClick={SignUp}>Sign up</button>
            </div>
        </div>
    )
}