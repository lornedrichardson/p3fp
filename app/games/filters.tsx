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

    const styleForLabel = "block text-lg font-medium leading-6 text-white rounded-md bg-red-700 w-28 indent-2"
    const styleForLabelBlk = "block text-lg font-medium leading-6 text-white rounded-md bg-black w-28 indent-2"
    const styleForInput = "py-1 rounded-md px-1 w-36"

    useEffect(() => {
        router.push(`/games?casino=${casinoDe}&gameType=${gameTypeDe}&gameName=${gameNameDe}&timeStart=${timeStartDe}`)
        router.refresh()
    }, [casinoDe, router, gameTypeDe, gameNameDe, timeStartDe])
    return (
<div className="py-7 flex items-center justify-center">
    <form className="flex flex-wrap md:flex-row flex-col items-center md:items-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="w-full md:w-1/4 px-2 py-2">
            <label className={styleForLabelBlk}>Casino:</label>
            <input type="text" className={styleForInput} onChange={(e) => { setCasino(e.target.value) }} />
        </div>
        <div className="w-full md:w-1/4 px-2 py-2">
            <label className={styleForLabel}>Game Type:</label>
            <input type="text" className={styleForInput} onChange={(e) => { setGameType(e.target.value) }} />
        </div>
        <div className="w-full md:w-1/4 px-2 py-2">
            <label className={styleForLabelBlk}>Game:</label>
            <input type="text" className={styleForInput} onChange={(e) => { setGameName(e.target.value) }} />
        </div>
        <div className="w-full md:w-1/4 px-2 py-2">
            <label className={styleForLabel}>Game Date:</label>
            <input type="date" className={styleForInput} onChange={(e) => { setTimeStart(e.target.value) }} />
        </div>
        <div className="w-full px-2 py-2 text-center md:text-left md:w-full flex items-center justify-center">
            <input
                type="reset"
                value="Reset"
                className="rounded-md bg-black px-3 text-xl font-semibold text-white shadow-sm hover:bg-red-700 transition ease-in-out delay-100 hover:scale-105"
                onClick={() => {
                    setCasino('');
                    setGameType('');
                    setGameName('');
                    setTimeStart('');
                }}
            />
        </div>
    </form>
</div>

    )
}

export default Filters