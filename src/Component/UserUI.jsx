import { useState } from 'react';


export default function USerUI(prop) {
    const [sevenDate, setSevenDate] = useState(prop.timeData.miliSec)

    const listDate = (date) => {
        let dateList = [new Date(date).toDateString()]
        for (let i = 1; i <= 7; i++) {
            dateList = [new Date(date - 86400000 * i).toDateString(), ...dateList]
        }
        return dateList
    }
    return (
        <div>
            <p>Here is your Daliy Data</p>
            {listDate(sevenDate).map((date, i) => {
                return (
                    <p key={i}>{date}</p>
                )
            })}
            <p>{prop.data.water}</p>
            <p>{prop.data.step}</p>
            <button onClick={() => {
                setSevenDate(sevenDate - 86400000 * 7)
                listDate(sevenDate)
            }}>Back</button>
            <button onClick={() => {
                if (sevenDate > prop.timeData.miliSec - 86400000) { }
                else {
                    setSevenDate(sevenDate + 86400000 * 7)
                    listDate(sevenDate)
                }
            }}>Next</button>
        </div>
    )
}