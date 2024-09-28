import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  
  useEffect(() => {
    if (searchCity) {
      setLoading(true);
      setError(null);

      axios
        .get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/pakistan?unitGroup=us&key=6TMSVUJ45XDXNTDWEYCNLZKCM&contentType=json`)
        .then((response) => {
          setWeatherData(response.data); // Update weather data
          setLoading(false);
        })
        .catch((err) => {
          setError('City not found or API error');
          setLoading(false);
        });
    }
  }, [searchCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchCity(city); // Trigger API call with entered city
  };

  return (
    <div className="weather-app">
      <h1>Weather Application</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && !loading && !error && (
        <div className="weather-info">
          <h2>{weatherData.address}</h2>
          <p>Temperature: {weatherData.currentConditions.temp}°F</p>
          <p>Weather: {weatherData.currentConditions.conditions}</p>
          <p>Humidity: {weatherData.currentConditions.humidity}%</p>
          <p>Wind Speed: {weatherData.currentConditions.windspeed} mph</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
