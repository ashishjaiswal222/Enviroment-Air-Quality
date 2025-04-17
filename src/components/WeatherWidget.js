import { Card, CardContent, Typography } from "@mui/material";

const WeatherWidget = ({ weatherData }) => (
  <Card className="shadow-lg">
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Weather
      </Typography>
      {weatherData ? (
        <>
          <Typography>City: {weatherData.name}</Typography>
          <Typography>Temperature: {weatherData.main.temp}°C</Typography>
          <Typography>Conditions: {weatherData.weather[0].description}</Typography>
        </>
      ) : (
        <Typography>Loading weather data...</Typography>
      )}
    </CardContent>
  </Card>
);

export default WeatherWidget;