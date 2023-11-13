'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../styles/globals.css'
import Image from 'next/image';
import background from '../../public/neonSymb.jpg';
import { redirect } from 'next/navigation'


const EditUser = (prop: any) => {
    const router = useRouter()
    const [dataInput, setDataInput] = useState({
        username: prop.data.username,
        pw: prop.data.pw,
        email: prop.data.email,
    })
    const datapass = async () => {
        const result = await fetch('../../api/user', {
            method: 'PUT',
            body: JSON.stringify({ user_id: prop.id, data: dataInput })
        })
        const data = await result.json()
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
                                    <label className={styleForLable}>username:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.username}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                username: e.target.value
                                            }));
                                        }} required />
                                </div>
                                <div>
                                    <label className={styleForLable}>password:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.pw}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                pw: e.target.value
                                            }));
                                        }}
                                        required />
                                </div>
                                <div>
                                    <label className={styleForLable}>email:</label>
                                    <input type="text"
                                        className={styleForInput}
                                        defaultValue={dataInput.email}
                                        onChange={(e) => {
                                            setDataInput(prevState => ({
                                                ...prevState,
                                                email: e.target.value
                                            }));
                                        }}
                                        required />
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

export default EditUser