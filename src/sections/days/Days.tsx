import { useEffect, useState } from 'react'
import { getDaysDate, featuredToday, arrayDay } from '../../utils/getDaysDate'
import './days.scss'

function Days() {
    const [state, setState] = useState<number[]>([])

    useEffect(() => {
        return getDaysDate(setState)
    },[])

    return (
        <div className="containerDays">
            {arrayDay.map((value, index) => (
                    <div key={index} className={featuredToday(index)}>
                        <p>{value}</p>
                        <p>{state[index]}</p>
                    </div>
                ))}
        </div>
    )
}

export default Days