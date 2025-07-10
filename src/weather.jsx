import React, { useState } from "react";
import './WeatherApp.css'

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Get API key from environment variable
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async (e) => {
        e.preventDefault();
        if (!city) return;
        setLoading(true);
        setError("");
        setWeather(null);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error("City Not Found");
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-app-container">
            <h2 className="weather-app-title">Weather App</h2>
            <form className="weather-form" onSubmit={fetchWeather} autoComplete="off">
                <input
                    className="weather-input"
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter City Name"
                />
                <button className="weather-btn" type="submit">Get Weather</button>
            </form>
            {loading && <p className="weather-loading">Loading...</p>}
            {error && <p className="weather-error">{error}</p>}
            {weather && (
                <div className="weather-card">
                    <h3>{weather.name}, {weather.sys.country}</h3>
                    <p className="weather-temp">{weather.main.temp}&deg;C</p>
                    <p className="weather-feels">Feels like: {weather.main.feels_like}&deg;C</p>
                    <p className="weather-minmax">Min: {weather.main.temp_min}&deg;C | Max: {weather.main.temp_max}&deg;C</p>
                    <p>Weather: {weather.weather[0].main} ({weather.weather[0].description})</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default Weather