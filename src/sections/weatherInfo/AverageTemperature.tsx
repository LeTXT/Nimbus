import { useEffect, useState } from 'react'
import { getWeather, WeatherData, notTemp } from '../../utils/getWeather'
import './weather.scss'

function AverageTemperature() {
    const [climate, setClimate] = useState<WeatherData | null>(null)

    useEffect(() => {
        getWeather(setClimate)
    }, [])

    return (
        <div className='containerAverageTemperature'>
            <div className='tempWeather'>
                <div className='climateImg' style={{backgroundImage: `url('https://openweathermap.org/img/wn/${climate?.weather[0]?.icon ?? '03d'}@2x.png')`}} title={climate?.weather[0]?.description}></div>
                
                <h2>{notTemp(climate?.main?.temp ?? 0)}</h2>
            </div>
        </div>
    )
}
export default AverageTemperature