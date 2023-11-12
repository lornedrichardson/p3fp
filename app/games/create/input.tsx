'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../../styles/globals.css'
import Image from 'next/image';
import background from '../../../public/neonSymb.jpg';

const Input = (prop: any) => {
    const router = useRouter()
    const [dataInput, setDataInput] = useState({
        user_id: Number(prop.auth),
        casino: null,
        machine: null,
        session_start: null,
        session_stop: null,
        game_type: null,
        game: null,
        wageramt: null,
        wagernum: null,
        win: null,
        loss: null,
        notes: null
    })
    const datapass = async () => {
        const result = await fetch('../../api/games', {
            method: 'POST',
            body: JSON.stringify({ data: dataInput })
        })
        const data = await result.json()
        if (data.Create) {
            alert('Created successfully!')
            router.push('/games')
        }
        else{
            alert('Created unsuccessfully! Please try again')
        }
    }
    const style = "block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-3"
    const styleForLable = "block text-sm font-medium leading-6 text-gray-200 bg-black/30 rounded-md w-28"
    const styleForButton= "flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
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
                            <form className="space-y-6" onSubmit={(e) => {
                                e.preventDefault()
                                datapass()
                            }}>
                                <div>
                                    <label className={styleForLable}>Casino:</label>
                                    <div className="mt-0">
                                        <input type="text"
                                            className={style}
                                            defaultValue={dataInput.casino}
                                            onChange={(e) => {
                                                setDataInput(prevState => ({
                                                    ...prevState,
                                                    casino: e.target.value
                                                }));
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={styleForLable}>Machine</label>
                                    <input type="text"
                                        className={style}
                                        defaultValue={dataInput.machine}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                machine: e.target.value
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Session date:</label>
                                    <input type="datetime-local"
                                        className={style}
                                        defaultValue={dataInput.session_start}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                session_start: e.target.value,
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Session End:</label>
                                    <input type="datetime-local"
                                        className={style}
                                        defaultValue={dataInput.session_stop}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                session_stop: e.target.value
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Game Type:</label>
                                    <input type="text"
                                        className={style}
                                        defaultValue={dataInput.game_type}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                game_type: e.target.value
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Game Name:</label>
                                    <input type="text"
                                        className={style}
                                        defaultValue={dataInput.game}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                game: e.target.value
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Wager Amount:</label>
                                    <input type="text"
                                        className={style}
                                        defaultValue={dataInput.wageramt}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                wageramt: e.target.value
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styleForLable}>Wager Number:</label>
                                    <input type="text"
                                        className={style}
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
                                        className={style}
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
                                        className={style}
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
                                        className={style}
                                        defaultValue={dataInput.notes}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                notes: e.target.value
                                            }));
                                        }}
                                    />
                                </div>
                                <button type="submit"
                                    className={styleForButton}
                                    onClick={() => {
                                        setDataInput(prevState => ({
                                            ...prevState,
                                            session_start: new Date(dataInput.session_start).toISOString(),
                                            session_stop: new Date(dataInput.session_stop).toISOString(),
                                        }))
                                    }}>Submit</button>
                                <button type="button"
                                    className={styleForButton}
                                    onClick={() => { router.push('/games') }}>Home page</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Input