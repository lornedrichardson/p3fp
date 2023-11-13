'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../../../styles/globals.css'
import Image from 'next/image';
import background from '../../../../public/neonSymb.jpg';

const Input = (prop: any) => {
    const router = useRouter()
    const [dataInput, setDataInput] = useState({
        user_id: prop.aurh,
        casino: prop.data.casino,
        machine: prop.data.machine,
        session_start: prop.data.session_start,
        session_stop: prop.data.session_stop,
        game_type: prop.data.game_type,
        game: prop.data.game,
        wageramt: prop.data.wageramt,
        wagernum: prop.data.wagernum,
        win: prop.data.win,
        loss: prop.data.loss,
        note: prop.data.note
    })
    const datapass = async () => {
        const result = await fetch('../../api/games', {
            method: 'PUT',
            body: JSON.stringify({ session_id: prop.session, data: dataInput })
        })
        const data = await result.json()
        console.log(data)
        if (data.Edit) {
            router.push('/games')
        }
    }

    const styleForInput = "block w-40 md:w-80 lg:w-96 rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-3 mx-auto"
    const styleForLable = "block text-sm font-medium leading-6 text-gray-200 bg-black/30 rounded-md w-28 mx-auto text-center"
    const styleForButton= "flex w-40 md:w-80 lg:w-96 justify-center rounded-md bg-gradient-to-r from-red-600 via-purple-900 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-l from-red-600 via-purple-900 to-blue-700 transition ease-in-out delay-100 hover:scale-105 mx-auto"
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
                        <div className="mt- sm:mx-auto sm:w-full sm:max-w-sm">
                            <form
                                className="space-y-3 md:space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    datapass()
                                }}>
                                <div>
                                    <label className={styleForLable}>Casino:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.casino}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                casino: e.target.value
                                            }));
                                        }} required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Machine</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.machine}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                machine: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Session Start</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.session_start}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                session_start: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Session End</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.session_stop}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                session_stop: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Game Type:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.game_type}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                game_type: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Game Name:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.game}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                game: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Wager Amount:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.wageramt}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                wageramt: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>Times Wagered:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.wagernum}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                wagernum: e.target.value
                                            }));
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Amount Win:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.win}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                win: e.target.value
                                            }));
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Amount Loss:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.loss}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                loss: e.target.value
                                            }));
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Note:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.note}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                note: e.target.value
                                            }));
                                        }}
                                    />
                                </div>
                                <button type="submit" className={styleForButton}>Submit</button>
                                <button type="button" className={styleForButton} onClick={() => { router.push('/games') }}>Home page</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Input