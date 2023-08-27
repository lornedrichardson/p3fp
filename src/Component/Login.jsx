import { useState } from 'react'

export default function Login(prop) {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [response, setResponse] = useState('')

    const datapass = () => {
        const fetchresdata = async () => {
            const response = await fetch(prop.API_URL+'sql', {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ userName, userPassword })
            })
            const resultInJson = await response.json()
            console.log(resultInJson)
            if (resultInJson.isInDatabase === true) {
                setResponse('Now redirect you to your main page')
                prop.IsAccountRegistered(userName)
            }
            if (resultInJson.isInDatabase === false) {
                setResponse('Look like you dont have a acc yet. Do you want to sign up?')
            }
            if (resultInJson.status === '404') {
                setResponse('404 Not Find. Please Enter Something')
            }
        }
        fetchresdata()
    }
    return (
        <div className="App">
            <form onSubmit={(e) => {
                e.preventDefault()
                datapass()
            }}>
                <label htmlFor="">User Name</label>
                <input type="text" name="userName" onChange={(e) => setUserName(e.target.value)} />
                <label htmlFor="">Password</label>
                <input type="text" name='password' onChange={(e) => setUserPassword(e.target.value)} />
                <button type='submit'>Sign In</button>
            </form>
            {response}
        </div>
    )
}