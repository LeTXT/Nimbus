import { useEffect, useState } from 'react'
import { getWeather, WeatherData } from '../../utils/getWeather'
import './weather.scss'

function HumidityVisibilityWind() {
    const [climate, setClimate] = useState<WeatherData | null>(null)

    useEffect(() => {
        getWeather(setClimate)
    }, [])

    return (
        <div className='containerHumidityVisibilityWind'>
            <div>
                <p>Humidade</p>
                <p>{climate?.main?.humidity ? climate?.main?.humidity + '%' : 'N/A'}</p>
            </div>
            <div>
                <p>Visibilidade</p>
                <p>{climate?.visibility ? (climate?.visibility / 1000).toString() + ' km': 'N/A'}</p>
            </div>
            <div>
                <p>Velocidade do Vento</p>
                <p>{climate?.wind?.speed ? (climate?.wind?.speed * 3.6).toFixed(1) + ' km/h' : 'N/A'}</p> 
            </div>
        </div>
    )
}

export default HumidityVisibilityWind