'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import '../../styles/globals.css'


export default function Page() {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isCreate, setIsCreate] = useState(true)
    const datapass = () => {
        const fetchresdata = async () => {
            const result = await fetch('api/user/signup', {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ username: username, pw: password, email:session.user.email ?? email})
            })
            const data = await result.json()
            if (data.isCreate) {
                push(`/`)
            } else {
                setIsCreate(data.isCreate)
            }
        }
        fetchresdata()
    }
    // if(session && session.user){
    //         setUsername(session.user.name.split(' ').join(''))
    //         setEmail(session.user.email)
    // }
    useEffect(()=>{
        if(session && session.user){
            setUsername(session.user.name.split(' ').join(''))
            setEmail(session.user.email)
    }
    },[])
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-slate-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-indigo-500">
                    Create Account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault()
                        if(username !== '' && password !== ''){
                            datapass()
                        }
                        else{
                            alert('Please try different username and password')
                        }
                    }}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-400">User name</label>
                        <input 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text" 
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-400">Password</label>
                        <input 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-400">Email</label>
                        <input 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="email" 
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button 
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type='submit'>Sign Up</button>
                    <button type="button"  
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                        signOut({ callbackUrl: '/' })
                        }}>Login page</button>
                </form>
            </div>
            {isCreate ? '' : 'User name alright used Please try different user name'}
        </div>
    )
}

