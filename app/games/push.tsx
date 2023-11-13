"use client"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { signOut } from "next-auth/react"
import '../../styles/globals.css'

const Push = ({ username }) => {
    const router = useRouter()
    const [editData, setEditData] = useState('')
    const [deleteData, setDeleteData] = useState('')
    const fetchresdata = async () => {
        const result = await fetch('api/user', {
            method: 'DELETE',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({})
        })
    }
    const buttonStyle = "text-white hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium ml-auto transition ease-in-out delay-100 hover:scale-105"

    return (
        <div>
            <div className="min-h-full">
                <nav className="bg-gradient-to-b from-black from-80%">
                    <div className="px-w-full sm:px-12 lg:px-8">
                        <div className="flex h-10 items-center justify-between">
                                <div className="flex items-baseline space-x-4 ">
                                    <a onClick={() => { router.push('/games/create/') }}
                                        className={buttonStyle}>
                                        Create New</a>
                                </div>
                                <div className="flex justify-items-end">
                                    <p
                                        className={buttonStyle}
                                    >Welcome Back! {username}</p>
                                    <button
                                        className={buttonStyle}
                                        onClick={() => {
                                            router.push('/profile')
                                        }
                                        }>Edit Profile</button>
                                    <button
                                        className={buttonStyle}
                                        onClick={() => {
                                            signOut({ callbackUrl: '/' })
                                            fetchresdata()
                                        }}>Sign Out</button>
                        </div>
                            </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Push