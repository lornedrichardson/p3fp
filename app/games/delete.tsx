'use client'

import { useRouter } from 'next/navigation'

const Delete = ({id})=>{
    const router = useRouter()
    return(
            <button 
            type="submit"
            onClick={async (e) => {
                const response = confirm("Are you sure you want to do that?");
                if (response) {
                    await fetch('api/games', {
                        method: 'DELETE',
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify({ session_id: Number(id) })
                    })
                    router.refresh()
                    alert("Delete succeed");
                } else {
                    alert("Cancel was pressed");
                }
            }}
            className="text-indigo-600 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Delete</button>
    )
}

export default Delete