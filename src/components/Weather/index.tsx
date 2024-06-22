import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  fetchWeather,
  fetchCityFromCoordinates,
} from "../../slices/weatherSlice";
import CustomError from "../Error";
import Loading from "../Loading";

const Weather: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    temperature,
    loading,
    error,
    date,
    city,
    weatherIcon,
    weatherDescription,
  } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    if (!city) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(
              fetchCityFromCoordinates({ lat: latitude, lon: longitude })
            );
          },
          (error) => {
            console.error("Error getting geolocation", error);
            dispatch(fetchWeather("delhi"));
          }
        );
      } else {
        dispatch(fetchWeather("delhi"));
      }
    } else {
      dispatch(fetchWeather(city));
    }
  }, [dispatch, city]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <CustomError error={error} />;
  }

  return (
    <div className="weather-container d-flex justify-content-between align-items-center px-4">
      <div>
        <h2>Your briefing</h2>
        <p>
          <span>{date}</span>
        </p>
      </div>
      <div
        className="bg-white d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
        style={{ width: "16rem" }}
      >
        <div className="w-4 h-4">
          {weatherIcon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt={weatherDescription || "Weather icon"}
            />
          )}
        </div>
        <div>
          <div>{city}</div>
          <h2 className="card-title">{temperature}°C</h2>
          <div>{weatherDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
