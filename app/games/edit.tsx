'use client'

import { useRouter } from 'next/navigation'

const Edit = ({id})=>{
    const router = useRouter()
    return(
        <button 
        type="submit"
        onClick={()=>{
            router.push(`/games/edit/${id}`)
        }}
        className="text-indigo-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >Edit</button>
    )
}

export default Edit