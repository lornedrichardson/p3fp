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
                <nav className="bg-gray-800">
                    <div className=" max-w-3xl px- sm:px-12 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="hidden md:block">
                                    <div className=" flex items-baseline space-x-4">
                                        <a onClick={() => { router.push('/games/create/') }} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Create New</a>
                                        <button
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium justify-end"
                                            onClick={() => {
                                                router.push('/')
                                            }}>Sign Out</button>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    )
}

export default Push