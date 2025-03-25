import { useState, useCallback, useEffect } from 'react'
import { timeContext } from './context/time'
import Navbar from './components/Navbar';
import WeatherToday from './components/WeatherToday';
import OtherCountries from './components/OtherCountries';
import Highlight from './components/Highlight';
import Forecast from './components/Forecast';
import Search from './components/Search';
function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const WeatherDesc = [
    {
      "type": "Sunny",
      "image": "https://example.com/sunny.jpg"
    },
    {
      "type": "Cloudy",
      "image": "https://example.com/cloudy.jpg"
    },
    {
      "type": "Rainy",
      "image": "https://example.com/rainy.jpg"
    },
    {
      "type": "Snowy",
      "image": "https://example.com/snowy.jpg"
    },
    {
      "type": "Windy",
      "image": "https://example.com/windy.jpg"
    },
    {
      "type": "Foggy",
      "image": "https://example.com/foggy.jpg"
    },
    {
      "type": "Thunderstorm",
      "image": "https://example.com/thunderstorm.jpg"
    },
    {
      "type": "Haze",
      "image": "https://example.com/hazy.jpg"
    },
    {
      "type": "Overcast",
      "image": "https://example.com/overcast.jpg"
    }
  ]
  
 /* useMemo(() => {
  let country = []
  let city = []
  let desc = []
  let temp = []
  let feelslike = []
  })*/
  // Get user's location using the Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => console.log(err)
    );
  }, [])

  const now = new Date();

  // Define the fetch function using useCallback
  const fetchWeatherbylatlon = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=2556d42900bc4fb19f418109e2ca2088`
      );
      const object = await response.json();
      console.log(object);
      setWeather(object);
      setLocation(object.data[0].city_name)
    } catch (err) {

      console.error(err);
    }
  }, [lat, lon]);
  useEffect(() => {
    setMonth(weather?.data?.[0]?.datetime.split('-')[1])
    setDay(weather?.data?.[0]?.datetime.split('-')[2].split(':')[0])
    setYear(weather?.data?.[0]?.datetime.split('-')[0])
   
  }, [weather])
  // Automatically fetch weather when the component mounts
  useEffect(() => {
    fetchWeatherbylatlon(); // Fetch weather data
  }, [fetchWeatherbylatlon]);

   useEffect(() => {
      if(location){
        fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=2556d42900bc4fb19f418109e2ca2088`)
        .then(response => response.json())
        .then(data => setWeather(data))
    }
   },[location])

 

   let update = {
    exactloc: weather?.data?.[0]?.city_name,
    exactloca: weather?.data?.[0]?.country_code,
    temp: weather?.data?.[0]?.temp,
    desc: weather?.data?.[0]?.weather?.description,
    icon: weather?.data?.[0]?.weather?.icon,
    wind: weather?.data?.[0]?.wind_spd,
    humidity: weather?.current?.humidity,
    feelslike: weather?.data?.[0]?.app_temp,
    uv: weather?.data?.[0]?.uv,
    visibility: weather.data?.[0]?.vis,
    pressure: weather?.data?.[0]?.pres,
    precip: weather?.data?.[0]?.precip,
    sunrise: weather?.data?.[0]?.sunrise,
    sunset: weather?.data?.[0]?.sunset,
  }
  const currentTime = update?.time?.split(" ")[1]
  /*useEffect(() => {
     country.push(weather?.location?.country)
     city.push(weather?.location?.name)
     desc.push(weather?.current?.weather_descriptions[0])
     temp.push(weather?.current?.temperature)
     feelslike.push(weather?.current?.feelslike)
     
  }, [weather, city, country, desc, feelslike, temp])*/
  console.log(weather)
  return (
    <>
      <timeContext.Provider value={{ now, location, setLocation, weather, update, month, day, year, currentTime, WeatherDesc }}>
        <div className='bg-black m-0 p-0 pb-5 overflow-hidden hide-scrollbar min-h-screen'>
          <div className='bg-black bg-opacity-80 text-white p-4 flex flex-col sm:flex-row justify-between items-center relative w-full'>
            <Navbar />
            <Search />
          </div>
          <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 px-2 sm:px-4 md:px-6'>
            <div className='flex flex-col justify-evenly items-center gap-4 lg:gap-6 w-full lg:w-auto'>
              <WeatherToday />
              <OtherCountries />
            </div>
            <div className='flex flex-col justify-evenly items-center gap-2 w-full lg:w-auto'>
              <Highlight />
              <Forecast />
            </div>
          </div>
        </div>
      </timeContext.Provider>
    </>
  )
}

export default App
