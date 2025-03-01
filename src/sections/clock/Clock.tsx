
import { useEffect, useState } from 'react'
import { setClock } from '../../utils/getClock'
import './clock.scss'

function Clock() {
    const [hours, setHours] = useState<string>('')
    const [seconds, setSeconds] = useState<string>('')

    useEffect(() => {
        setInterval(() => {
            setClock(setHours, setSeconds)}, 500)
    }, [])

    return(
        <div className="containerClock">
            <div className="hours">
                <h1>{hours}</h1>
            </div>
            <div className="second">
                <p>{seconds}</p>
            </div>
        </div>
    )
}

export default Clock