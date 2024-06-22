import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCityFromCoordinates,
  fetchWeather,
} from "../../slices/weatherSlice";
import type { AppDispatch } from "../../store/store";

const LocationPermissionDialog: React.FC = () => {
  const [locationAllowed, setLocationAllowed] = useState<boolean>(() => {
    return localStorage.getItem("locationAllowed") === "true";
  });
  const [locationDenied, setLocationDenied] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (locationAllowed) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchCityFromCoordinates({ lat: latitude, lon: longitude }))
            .unwrap()
            .then((city) => {
              dispatch(fetchWeather(city));
            })
            .catch((error) => {
              console.error("Error fetching city from coordinates:", error);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationDenied(true);
        }
      );
    }
  }, [locationAllowed, dispatch]);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationAllowed(true);
        localStorage.setItem("locationAllowed", "true");
      },
      (error) => {
        console.error("Error requesting location:", error);
        setLocationDenied(true);
      }
    );
  };

  return (
    <div>
      {!locationAllowed && !locationDenied && (
        <div className="dialog p-4">
          <p>
            Please allow location access to get weather updates for your area.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={requestLocation}
          >
            Allow Location
          </button>
        </div>
      )}
      {locationDenied && (
        <div className="dialog">
          <p>
            Location access denied. Please enable it in your browser settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPermissionDialog;
