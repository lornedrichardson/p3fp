"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import '../../styles/globals.css'

const Push = () => {
    const router = useRouter()
    const [editData, setEditData] = useState('')
    const [deleteData, setDeleteData] = useState('')


    return (
        <div>
            <div className="min-h-full">
                <nav className="bg-gradient-to-b from-black from-80%">
                    <div className="px-w-screen sm:px-12 lg:px-8">
                        <div className="flex h-20 items-center justify-between">
                            <div className="hidden md:block">
                                <div className="flex items-baseline space-x-4">
                                    <a onClick={() => { router.push('/games/create/') }} className="text-white hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Create New</a>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-baseline space-x-4">
                                    <button
                                        className="text-white hover:bg-red-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium ml-auto"
                                        onClick={() => {
                                            router.push('/')
                                        }}>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Push