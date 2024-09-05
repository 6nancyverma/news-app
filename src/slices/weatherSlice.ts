import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  temperature: number | null;
  loading: boolean;
  error: string | null;
  date: string;
  day: string;
  city: string | null;
  weatherIcon: string | null;
  weatherDescription: string | null;
}

const initialState: WeatherState = {
  temperature: null,
  loading: false,
  error: null,
  date: "",
  day: "",
  city: null,
  weatherIcon: null,
  weatherDescription: null,
};

const weatherApiKey = import.meta.env.VITE_API_WEATHER_API;

interface WeatherResponse {
  temperature: number;
  date: string;
  day: string;
  city: string;
  weatherIcon: string;
  weatherDescription: string;
}

export const fetchWeather = createAsyncThunk<WeatherResponse, string>(
  "weather/fetchWeather",
  async (city: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
    );
    const data = response.data;
    const temperature = data.main.temp;
    const weatherIcon = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;
    const date = new Date();
    const day = date.toLocaleString("en-US", { weekday: "long" });

    return {
      temperature,
      date: date.toDateString(),
      day,
      city,
      weatherIcon,
      weatherDescription,
    };
  }
);

export const fetchCityFromCoordinates = createAsyncThunk<
  string,
  { lat: number; lon: number }
>(
  "weather/fetchCityFromCoordinates",
  async (coordinates: { lat: number; lon: number }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weatherApiKey}`
    );
    
    const data = response.data;
    const city = data[0].name;
    return city;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.temperature = action.payload.temperature;
        state.date = action.payload.date;
        state.day = action.payload.day;
        state.city = action.payload.city;
        state.weatherIcon = action.payload.weatherIcon;
        state.weatherDescription = action.payload.weatherDescription;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(fetchCityFromCoordinates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityFromCoordinates.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload;
      })
      .addCase(fetchCityFromCoordinates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default weatherSlice.reducer;
