'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../styles/globals.css'


const EditUser = (prop: any) => {
    const router = useRouter()
    console.log(prop)
    const [dataInput, setDataInput] = useState({
        username: prop.data.username,
        password: prop.data.pw,
        email: prop.data.email,
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

    const styleForLable = "block text-sm font-medium leading-5 text-gray-400"
    const styleForInput = "block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4"
    const styleForButton = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-slate-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            </div>
            <div className="mt- sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault()
                        datapass()
                    }}>
                    <div>
                        <label className={styleForLable}>Username:</label>
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
                        <label className={styleForLable}>Password</label>
                        <input type="text"
                            className={styleForInput}
                            defaultValue={dataInput.password}
                            onChange={(e) => {
                                setDataInput(prevState => ({
                                    ...prevState,
                                    password: e.target.value
                                }));
                            }}
                            required />
                    </div>
                    <div>
                        <label className={styleForLable}>Email</label>
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
    )
}

export default EditUser