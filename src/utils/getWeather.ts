let userLocation = null
const APIkey = '5010c5460e3e9df6f634b1198ce7b362'

export type WeatherData = {
    main: {
      temp: number,
      temp_max: number,
      temp_min: number,
      humidity: number,
      
    },
    weather: [{
      description: string,
      icon: string
    }],
    visibility: number,
    wind: {
      speed: number,
      deg: number
    }
  };

export const notTemp = (info: number) => info.toString().split(".")[0] + '°C'


export const getWeather = (setClimate: React.Dispatch<React.SetStateAction<WeatherData | null>>
  
) => {
  const currentPosition = (position: GeolocationPosition) => {
    userLocation = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&lang=pt_br&appid=${APIkey}&units=metric`
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setClimate(data)
      })
      .catch(error => console.error(error));
  }
  
  const errorCurrentPosition = (erro: GeolocationPositionError) => {
    console.error(erro);
  
    userLocation = {
      lat: -23.5489,
      lon: -46.6388
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&appid=${APIkey}&units=metric`
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setClimate(data)
      })
      .catch(error => console.error(error));
  }
  
  navigator.geolocation.getCurrentPosition(currentPosition, errorCurrentPosition)
    
}

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Taboão da Serra&lang=pt_br&appid=${APIkey}&units=metric`
 // fetch(url)
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Error');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //     setState(data.main)
    //     setWeather(data.weather[0])
    //     console.log(data);
        
        
    // })
    // .catch(error => {
    //   console.error('Erro:', error);
    // });