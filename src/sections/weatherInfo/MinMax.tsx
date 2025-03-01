import { useEffect, useState } from 'react'
import { getWeather, WeatherData, notTemp } from '../../utils/getWeather'
import './weather.scss'

function MinMax() {
    const [minMax, setMinMax] = useState<WeatherData | null>(null)

    useEffect(() => {
        getWeather(setMinMax)
    }, [])

    return (
        <div className='minMaxContainer'>
            <div className='max'>
                <h1>Max</h1>
                <h2>{notTemp(minMax?.main?.temp_max ?? 0)}</h2>
            </div>
            <div>
                <h1>Min</h1>
                <h2>{notTemp(minMax?.main?.temp_min ?? 0)}</h2>
            </div>
        </div>
    )
}

export default MinMax