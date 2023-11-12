'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../styles/globals.css'
import Image from 'next/image'
import background from '../../public/neonBoard.jpg'



export default function Page() {
    const { push } = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isCreate, setIsCreate] = useState(true)
    const datapass = () => {
        const fetchresdata = async () => {
            const result = await fetch('api/user/signup', {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ username: username, password: password })
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
    return (
        <main className='flex flex-col items-center justify-between'>
            <div className='relative w-full'>
                <div className='absolute -z-10 w-full'>
                    <Image src={background} alt="background image" className='w-screen h-screen' width={1000} height={1000} />
                </div>
                <div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-red-600">
                    Create Your Account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center text-white">
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
                        <label className="block text-sm font-medium leading-6 text-gray-200">Username</label>
                        <input 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-lg sm:leading-6 indent-2"
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-200">Password</label>
                        <input 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 indent-2"
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button 
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-600 via-purple-900 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-l from-red-600 via-purple-900 to-blue-700 transition ease-in-out delay-100 hover:scale-105"
                    type='submit'>Sign Up</button>
                    <button type="button"  
                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-600 via-purple-900 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-l from-red-600 via-purple-900 to-blue-700 transition ease-in-out delay-100 hover:scale-105"
                    onClick={() => { push('/') }}>Login page</button>
                </form>
                {isCreate ? '' : 'Username exists. Please try different username.'}
            </div>
        </div>
                </div>
            </div>
        </main>
    )
}

