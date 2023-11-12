import { prisma } from "../../server/db/client"
import Filters from "./filters"
import { cookies } from 'next/headers'
import Push from "./push"
import '../../styles/globals.css'
import { redirect } from 'next/navigation'
import Edit from "./edit"
import Delete from "./delete"
import Image from 'next/image';
import background from '../../public/blueFelt.jpg';


const Page = async ({

  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

  const casino =
    typeof searchParams.casino === 'string' ? searchParams.casino : undefined
  const game_type =
    typeof searchParams.gameType === 'string' ? searchParams.gameType : undefined
  const game =
    typeof searchParams.gameName === 'string' ? searchParams.gameName : undefined
  const time =
    typeof searchParams.timeStart === 'string' ? searchParams.timeStart : undefined

  if (cookies().get('user_id') === undefined) {
    redirect('/')
  } else {
    const auth = cookies().get('user_id').value
    const where = {
      user_id: Number(auth),
      casino,
      game_type,
      game,
      session_start: { lte: time + 'T23:59:59.999Z', gte: time + 'T00:00:00.000Z' }
    }
    Object.getOwnPropertyNames(where).forEach(function (prop) {
      let descriptor1 = Object.getOwnPropertyDescriptor(where, prop);
      if (descriptor1.value === '') {
        delete where[prop];
      }
      if (prop === 'session_start') {
        if (!time) {
          delete where.session_start
        }
      }
    });
    const allGameData = await prisma.gamedata.findMany({
      where,
      orderBy: { session_start: 'desc' }
    })
    let display = allGameData.map((arr, index) => {
      const rowData = Object.getOwnPropertyNames(arr).map((prop) => {
        const data = Object.getOwnPropertyDescriptor(arr, prop).value;
        if (prop === 'user_id') {
          return null
        }
        if (prop === 'session_id') {
          return data
        }
        if (prop === 'session_start' || prop === 'session_stop') {
          const time = String(data).slice(0, 24);
          return (
            <td
              key={prop}
              className="px-7 py-2 font-serif text-center"
            >{`${time}`}</td>
          );
        } else {
          return (
            <td
              key={prop}
              id={prop}
              className="px-5 py-2 font-serif text-center"
            >{`${data}`}</td>
          );
        }
      });

      let idData = rowData[0]
      delete rowData[0]

      return (
        <tr key={index} className="border-b border-gray-200">
          <Edit id={idData} />
          {rowData}
          <Delete id={idData} />
        </tr>
      );
    });




    return (
      <main className='flex flex-col items-center justify-between'>
        <div className='relative w-full'>
          <div className='absolute -z-10 w-full'>
            <Image src={background} alt="background image" className='w-screen h-screen' width={1000} height={1000} />
          </div>
          <div>
            <div className="h-screen">
              <Push />
              <Filters />
              <div className="container">
                <table className="w-screen table-auto">
                  <thead className="text-white bg-gradient-to-r from-red-700 to-black ">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">Casino</th>
                      <th className="px-4 py-2">Machine</th>
                      <th className="px-4 py-2">Session Start</th>
                      <th className="px-4 py-2">Session Stop</th>
                      <th className="px-4 py-2">Game Type</th>
                      <th className="px-4 py-2">Game</th>
                      <th className="px-4 py-2">Wager Amount</th>
                      <th className="px-4 py-2">Wager Number</th>
                      <th className="px-4 py-2">Win</th>
                      <th className="px-4 py-2">Loss</th>
                      <th className="px-4 py-2">Notes</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {display}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Page