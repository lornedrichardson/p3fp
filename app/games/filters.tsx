"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from 'use-debounce';
import '../../styles/globals.css'


const Filters = () => {
    const router = useRouter()
    const [casino, setCasino] = useState('')
    const [casinoDe] = useDebounce(casino, 500);
    const [gameType, setGameType] = useState('')
    const [gameTypeDe] = useDebounce(gameType, 500);
    const [gameName, setGameName] = useState('')
    const [gameNameDe] = useDebounce(gameName, 500);
    const [timeStart, setTimeStart] = useState('')
    const [timeStartDe] = useDebounce(timeStart, 500);

    const styleForLabel = "block text-lg font-medium leading-6 text-indigo-600"
    const styleForInput = "py-1 rounded-md px-1"

    useEffect(() => {
        router.push(`/games?casino=${casinoDe}&gameType=${gameTypeDe}&gameName=${gameNameDe}&timeStart=${timeStartDe}`)
    }, [casinoDe, router, gameTypeDe, gameNameDe, timeStartDe])
    return (
        <div className=" bg-slate-400 py-3 w-full">
            <form style={{display:'inline-flex'}} className="px-12">
                <div className="px-6">
                    <label className={styleForLabel}>Loaction:</label>
                    <input type="text" className={styleForInput} onChange={(e) => { setCasino(e.target.value) }} />
                </div>
                <div className="px-6">
                    <label className={styleForLabel}>Game Type:</label>
                    <input type="text" className={styleForInput} onChange={(e) => { setGameType(e.target.value) }} />
                </div>
                <div className="px-6">
                    <label className={styleForLabel}>Game Name:</label>
                    <input type="text" className={styleForInput} onChange={(e) => { setGameName(e.target.value) }} />
                </div>
                <div className="px-6">
                    <label className={styleForLabel}>Game Date:</label>
                    <input type="date" className={styleForInput} onChange={(e) => { setTimeStart(e.target.value) }} />
                </div>
                <input 
                type="reset" 
                value="Reset" 
                className="rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>{
                    setCasino('')
                    setGameType('')
                    setGameName('')
                    setTimeStart('')
                    }}/>
            </form>
        </div>
    )
}

export default Filters