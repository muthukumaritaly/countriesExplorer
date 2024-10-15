import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}


const WeatherInfo: React.FC<{ capital: string }> = ({ capital }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(API_URL);
        setWeatherData(response.data);
      } catch (err) {
        setError(`Weather data can't found`);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [capital]);

  if (loading) return <p>Loading weather information...</p>;
  if (error) return <p>{error}</p>;

  return (
    weatherData && (
      <div>
        <Card.Text>
          <strong>Weather in {weatherData?.location.name}:</strong>
        </Card.Text>
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={weatherData?.current.condition.icon}
            alt={weatherData?.current.condition.text}
            style={{ width: '100px', marginRight: '10px' }}
          />
          <div>
            <p>
              <strong>Temperature:</strong> {weatherData?.current.temp_c} °C
            </p>
            <p>
              <strong>Conditions:</strong> {weatherData?.current.condition.text}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default WeatherInfo;
