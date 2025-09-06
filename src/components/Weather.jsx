import { useState, useEffect } from "react";

export default function Weather({ t }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const API_KEY = "f9ed759aa25a0b909635962e2691b5bf";

    const fetchWeather = (lat, lon) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          if (data && data.main) {
            setWeather({
              city: data.name,
              temp: Math.round(data.main.temp),
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              wind: data.wind.speed,
              desc: data.weather[0].description,
              icon: data.weather[0].icon,
            });
          } else {
            setError("⚠️ Weather data not available");
          }
        })
        .catch(() => setError("⚠️ Failed to fetch weather data"));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => {
          setError("⚠️ Location access denied, showing default city (Delhi).");
          fetchWeather(28.6139, 77.2090); // Default Delhi
        }
      );
    } else {
      setError("⚠️ Geolocation not supported, showing default city (Delhi).");
      fetchWeather(28.6139, 77.2090);
    }
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-banner" onClick={() => setShowPopup(true)}>
          <div className="weather-banner-left">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather"
            />
            <div>
              <h1>{weather.temp}°C</h1>
              <p>{weather.city} · {weather.desc}</p>
            </div>
          </div>
          <p>Tap to view details ⬆️</p>
        </div>
      )}

      {showPopup && weather && (
        <div className="weather-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            <h2>{weather.city}</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="weather" />
            <h1>{weather.temp}°C</h1>
            <p>☁️ {weather.desc}</p>
            <ul>
              <li>💧 Humidity: {weather.humidity}%</li>
              <li>🌬️ Wind: {weather.wind} m/s</li>
              <li>📊 Pressure: {weather.pressure} hPa</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}