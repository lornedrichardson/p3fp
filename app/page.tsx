'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import '../styles/globals.css'
import Image from 'next/image';
import background from '../public/neonBoard.jpg';
import Google from '../src/img/google.png'

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
        body: JSON.stringify({ username: username, pw: password, email: session ? session.user.email : '' })
      })
      const data = await result.json()
      if (data.isLogin === false && data.canSignUp) {
          push(`http://localhost:3000/signup`)
      }
      else if (data.isLogin) {
        console.log('is Login')
        push(`/games`)
      }
      else {
        signOut()
        // alert('dont find match user. Do you want to try again or sign up?')
      }
    }
    fetchresdata()
  }
  if (session && session.user) {
      datapass()
  }
  useEffect(()=>{
   },[])
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
                  <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-200 text-center">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text" onChange={(e) => setUsername(e.target.value)}
                      className="block w-40 md:w-80 lg:w-96 px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 indent-1 mx-auto "
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password" onChange={(e) => setPassword(e.target.value)}
                      className="block w-40 md:w-80 lg:w-96 px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 indent-1 mx-auto"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-40 md:w-80 lg:w-96 justify-center rounded-md bg-gradient-to-r from-red-600 via-purple-900 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-l from-red-600 via-purple-900 to-blue-700 transition ease-in-out delay-100 hover:scale-105 mx-auto"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div
                className='flex w-full justify-center mt-5'>
                <button
                  onClick={() => signIn("google")}>
                  <img
                    className='w-12 px-2'
                    src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw" alt="" />
                </button>
                <button
                  onClick={() => signIn("github")}>
                  <img
                    className='w-12 px-2'
                    src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="" />

                </button>
              </div>
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