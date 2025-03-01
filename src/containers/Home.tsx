import Clock from "../sections/clock/Clock"
import Days from "../sections/days/Days"
import AverageTemperature from "../sections/weatherInfo/AverageTemperature"
import MinMax from "../sections/weatherInfo/MinMax"
import HumidityVisibilityWind from "../sections/weatherInfo/HumidityVisibilityWind"
import Timer from "../sections/time/Timer"
import './home.scss'

function Home() {
    return(
        <div className="container">
            <Clock />
            <Days />
            <div className="inline">
                <AverageTemperature />
                <MinMax />
            </div>
            <HumidityVisibilityWind />
            <Timer />
        </div>
    )
}

export default Home