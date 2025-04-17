import axios from "axios";

export const fetchWeatherData = async (city = "London") => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
  );
  return response.data;
};