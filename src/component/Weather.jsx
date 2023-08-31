import React, { useState, useEffect } from "react";
import './Weather.css'

const api = {
    key: "4cd0d6d6e449eff3901a45f85f4ce1b6",
    base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    useEffect(() => {
        if (typeof weather.main !== "undefined") {
            const weatherCondition = weather.weather[0].main.toLowerCase();
            const appElement = document.querySelector('.app');

            if (weatherCondition === 'sunny') {
                appElement.classList.add('sunny');
                appElement.classList.remove('warm');
            } else if (weatherCondition === 'clouds') {
                appElement.classList.add('clouds');
                appElement.classList.remove('warm');
            } else if (weatherCondition === 'rain') {
                appElement.classList.add('rain');
                appElement.classList.remove('warm');
            } else if (weatherCondition === 'haze') {
                appElement.classList.add('haze');
                appElement.classList.remove('warm');
            } else if (weatherCondition === 'snow') {
                appElement.classList.add('snow');
                appElement.classList.remove('warm');
            } else if (weatherCondition === 'windy') {
                appElement.classList.add('windy');
                appElement.classList.remove('warm');
            } else {
                appElement.classList.remove('sunny', 'clouds', 'rain', 'haze', 'snow', 'windy');
            }
        }
    }, [weather]);

    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setQuery("");
                    console.log(result);
                });
        }
    };

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
