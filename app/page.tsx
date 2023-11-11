'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn,signOut } from 'next-auth/react'
import '../styles/globals.css'
import Image from 'next/image';
import background from '../public/neonBoard.jpg';

export default function Login() {
  const { data: session } = useSession()
  const { push } = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const datapass = () => {
    const fetchresdata = async () => {
      const result = await fetch('api/user', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ username: username, pw: password,email:session?.user?.email??''})
      })
      const data = await result.json()
      if (data.isLogin) {
        push(`/games`)
      } else {
        signOut()
        // alert('dont find match user. Do you want to try again or sign up?')
      }
    }
    fetchresdata()
  }
  if (session && session.user) {
    console.log('yes')
    datapass()
  }
  // useEffect(()=>{
  //   deleteTokens()
  // },[])
  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='relative w-full'>
        <div className='absolute -z-10 w-full'>
          <Image src={background} alt="background image" className='w-screen h-screen' width={1000} height={1000} />
        </div>
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-blue-700">
                Slot Tracker App
              </h1>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={(e) => {
                console.log("this is prevent Default")
                e.preventDefault()
                datapass()
              }}>
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-200">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text" onChange={(e) => setUsername(e.target.value)}
                      className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password" onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
                <button
                  className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => signIn()}>GOOGLE
                </button>
              </form>

              <p className="mt-10 text-center text-sm text-gray-200">
                Not a member?{' '}
                <a href="/signup" className="font-semibold leading-6  text-red-600 hover:text-blue-500">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}