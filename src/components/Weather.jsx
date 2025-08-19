import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.svg'
import cloud_icon from '../assets/clouds.svg'
import drizzle_icon from '../assets/drizzle.svg'
import rain_icon from '../assets/rain.svg'
import thunderstorm_icon from '../assets/thunderstorm.svg'
import snow_icon from '../assets/snow.svg'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": cloud_icon,
        "04n": cloud_icon,
        "09d": drizzle_icon,
        "09n": drizzle_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": thunderstorm_icon,
        "11n": thunderstorm_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city)=>{
        if(city === "") {
            alert("Enter a city name, please!")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } 
        catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data.");
        }
    }

    // useEffect(()=>{
    //     search("Shanghai");
    // },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='stats'>
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            <div className='rec'>
                <h4 className='header'>Today's Advice: Moderate </h4>
                <p>Sun protection? [umbrella or sunscreen]</p>
                <p>Rain gear?</p>
                <p>Cool or warm clothing?</p>
            </div>
        </div>
        <div className='forecast-data'>
            <div className='day'>
                <p>Aug 18</p>
                <img src={clear_icon} alt="" />
                <div className='temp'>
                    <p>Actual: 30ºC</p>
                    <p>Feels like: 30ºC</p>
                </div>
            </div>
            <div className='day'>
                <p>Aug 18</p>
                <img src={clear_icon} alt="" />
                <div className='temp'>
                    <p>Actual: 30ºC</p>
                    <p>Feels like: 30ºC</p>
                </div>
            </div>
            <div className='day'>
                <p>Aug 18</p>
                <img src={clear_icon} alt="" />
                <div className='temp'>
                    <p>Actual: 30ºC</p>
                    <p>Feels like: 30ºC</p>
                </div>
            </div>
            <div className='day'>
                <p>Aug 18</p>
                <img src={clear_icon} alt="" />
                <div className='temp'>
                    <p>Actual: 30ºC</p>
                    <p>Feels like: 30ºC</p>
                </div>
            </div>
        </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
