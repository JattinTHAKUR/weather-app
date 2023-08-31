import React, { useState, useEffect } from "react";
import './Weather.css'

// API details for fetching weather data
const api = {
    key: "4cd0d6d6e449eff3901a45f85f4ce1b6",
    base: "https://api.openweathermap.org/data/2.5/",
};

// Ham yahaan par ek Weather component banayenge
const Weather = () => {
    // State hooks for managing user input and fetched weather data
    const [query, setQuery] = useState(""); // query mei search input store hogi
    const [weather, setWeather] = useState({}); // fetched weather data store hogi

    // useEffect hook to handle background color change based on weather condition
    useEffect(() => {
        // Is if condition mei check hota hai ki weather data mila hai ya nahi
        if (typeof weather.main !== "undefined") {
            const weatherCondition = weather.weather[0].main.toLowerCase(); // Weather ki condition determine ki jaati hai
            const appElement = document.querySelector('.app'); // app class wale element ko select kiya jata hai

            // Yahan par hum weather ki condition ke hisab se CSS class change karte hain
            if (weatherCondition === 'sunny') {
                appElement.classList.add('sunny'); // Sunny condition ke liye sunny class add kiya jaata hai
                appElement.classList.remove('warm'); // Warm condition wale class ko remove kiya jaata hai
            } else if (weatherCondition === 'clouds') {
                appElement.classList.add('clouds'); // Cloudy condition ke liye clouds class add kiya jaata hai
                appElement.classList.remove('warm'); // Warm condition wale class ko remove kiya jaata hai
            } else if (weatherCondition === 'rain') {
                appElement.classList.add('rain'); // Rainy condition ke liye rain class add kiya jaata hai
                appElement.classList.remove('warm'); // Warm condition wale class ko remove kiya jaata hai
            } else if (weatherCondition === 'haze') {
                appElement.classList.add('haze'); // Hazy condition ke liye haze class add kiya jaata hai
                appElement.classList.remove('warm'); // Warm condition wale class ko remove kiya jaata hai
            } else if (weatherCondition === 'snow') {
                appElement.classList.add('snow'); // Snowy condition ke liye snow class add kiya jaata hai
                appElement.classList.remove('warm'); // Warm condition wale class ko remove kiya jaata hai
            } else if (weatherCondition === 'windy') {
                appElement.classList.add('windy'); // Windy condition ke liye windy class add kiya jaata hai
                appElement.classList.remove('warm'); // Warm condition wale class ko remove kiya jaata hai
            } else {
                // Agar koi specific condition nahi toh saari classes remove ki jaati hain
                appElement.classList.remove('sunny', 'clouds', 'rain', 'haze', 'snow', 'windy');
            }
        }
    }, [weather]);

    // Search function to fetch weather data
    const search = (evt) => {
        if (evt.key === "Enter") {
            // Fetch weather data from the API based on user input
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result); // Fetched weather data is set in the state
                    setQuery(""); // Clear the search input
                    console.log(result); // Log the fetched data for debugging
                });
        }
    };

    // Return the JSX content for rendering the component
    return (
        <div className={`app ${(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'warm' : '') : ''}`}>
            <main align="center">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>

                <div className="location-box">
                    {weather.name && weather.sys && (
                        <div className="location">
                            {weather.name}, {weather.sys.country}
                            <div className="date">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                <div className="weather-box">
                                    <div className="temp">
                                        {Math.round(weather.main.temp)}°C
                                    </div>
                                    <div className="weather">
                                        {weather.weather[0].main}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Weather;
