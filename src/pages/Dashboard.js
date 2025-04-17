import { useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import ChartWrapper from "../components/ChartWrapper";
import AlertPanel from "../components/AlertPanel";
import MapWidget from "../components/MapWidget";
import WeatherWidget from "../components/WeatherWidget";
import useSensorData from "../hooks/useSensorData";
import ProtectedRoute from "../components/ProtectedRoute";


import Bideo from "bideo";
import "bideo/dist/bideo.css";


useEffect(() => {
  new Bideo({
    container: document.querySelector("#background-video"),
    src: [{ src: "/assets/videos/background.mp4", type: "video/mp4" }],
    isMobile: false,
  });
}, []);
  const latestData = sensorData[sensorData.length - 1] || {};

  return (
    <ProtectedRoute>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container maxWidth="lg" className="py-8">
          
        <Typography variant="h1" className="text-5xl font-bold text-gray-800" data-aos="zoom-in">
  Welcome to AirVibe
</Typography>
<Typography variant="h5" className="mt-4 text-gray-600" data-aos="zoom-in" data-aos-delay="200">
  Monitor air quality in real-time with cutting-edge sensors and AI-driven insights.
</Typography>
<Button
  variant="contained"
  size="large"
  className="mt-6"
  onClick={() => navigate(user ? "/dashboard" : "/register")}
  data-aos="zoom-in" data-aos-delay="400"
>
  Get Started
</Button>
          {/* Real-Time Cards */}
          <Grid container spacing={3} data-aos="fade-up" data-aos-delay="400">
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="Temperature"
                value={latestData.temperature?.doubleValue || "N/A"}
                unit="°C"
              />
            </Grid>
            <Grid container spacing={3} className="mt-12">
  <Grid item xs={12} sm={4} data-aos="fade-up">
    <Typography variant="h6">Real-Time Monitoring</Typography>
    <Typography>Track temperature, humidity, AQI, and CO levels instantly.</Typography>
  </Grid>
  <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="200">
    <Typography variant="h6">AI Predictions</Typography>
    <Typography>Forecast air quality trends with machine learning.</Typography>
  </Grid>
  <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="400">
    <Typography variant="h6">Interactive Maps</Typography>
    <Typography>Visualize sensor locations and air quality data.</Typography>
  </Grid>
</Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="Humidity"
                value={latestData.humidity?.doubleValue || "N/A"}
                unit="%"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="AQI (MQ135)"
                value={latestData.mq135?.integerValue || "N/A"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="CO (MQ7)"
                value={latestData.mq7?.integerValue || "N/A"}
                unit="ppm"
              />
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} className="mt-8">
            <Grid item xs={12} md={6} data-aos="fade-right">
              <ChartWrapper
                type="line"
                title="Temperature & Humidity"
                data={{
                  labels: sensorData.map((d) => d.timestamp?.timestampValue || ""),
                  datasets: [
                    {
                      label: "Temperature (°C)",
                      data: sensorData.map((d) => d.temperature?.doubleValue || 0),
                      borderColor: "#2196F3",
                    },
                    {
                      label: "Humidity (%)",
                      data: sensorData.map((d) => d.humidity?.doubleValue || 0),
                      borderColor: "#4CAF50",
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left">
              <ChartWrapper
                type="bar"
                title="Air Quality Index (AQI)"
                data={{
                  labels: sensorData.map((d) => d.timestamp?.timestampValue || ""),
                  datasets: [
                    {
                      label: "AQI",
                      data: sensorData.map((d) => d.mq135?.integerValue || 0),
                      backgroundColor: "#FF5722",
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-right" data-aos-delay="200">
              <ChartWrapper
                type="line"
                title="CO Levels (MQ7)"
                data={{
                  labels: sensorData.map((d) => d.timestamp?.timestampValue || ""),
                  datasets: [
                    {
                      label: "CO (ppm)",
                      data: sensorData.map((d) => d.mq7?.integerValue || 0),
                      borderColor: "#9C27B0",
                      fill: true,
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="200">
              <ChartWrapper
                type="line"
                title="Pressure Variations"
                data={{
                  labels: sensorData.map((d) => d.timestamp?.timestampValue || ""),
                  datasets: [
                    {
                      label: "Pressure (hPa)",
                      data: sensorData.map((d) => d.pressure?.doubleValue || 0),
                      borderColor: "#FFC107",
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-right" data-aos-delay="400">
              <ChartWrapper
                type="scatter"
                title="AQI vs Weather"
                data={{
                  datasets: [
                    {
                      label: "AQI vs Temp",
                      data: sensorData.map((d) => ({
                        x: d.temperature?.doubleValue || 0,
                        y: d.mq135?.integerValue || 0,
                      })),
                      backgroundColor: "#E91E63",
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="400">
              <ChartWrapper
                type="line"
                title="Predictive AQI Forecast"
                data={{
                  labels: sensorData.map((d) => d.timestamp?.timestampValue || ""),
                  datasets: [
                    {
                      label: "Predicted AQI",
                      data: sensorData.map((d) => (d.mq135?.integerValue || 0) * 1.1), // Dummy prediction
                      borderColor: "#607D8B",
                      borderDash: [5, 5],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>

          {/* Alerts and Map */}
          <Grid container spacing={3} className="mt-8">
            <Grid item xs={12} md={6} data-aos="zoom-in">
              <AlertPanel sensorData={sensorData} />
            </Grid>
            <Grid item xs={12} md={6} data-aos="zoom-in" data-aos-delay="200">
              <MapWidget />
            </Grid>
          </Grid>
          <Grid container spacing={3} className="mt-8">
  <Grid item xs={12} data-aos="fade-up">
    <TestimonialSlider />
  </Grid>
</Grid>


          {/* Weather Widget */}
          <Grid container spacing={3} className="mt-8">
            <Grid item xs={12} data-aos="fade-up">
              <WeatherWidget weatherData={weatherData} />
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </ProtectedRoute>
  );
  {user ? (
    <Grid item xs={12} sm={6} md={3}>
      <DashboardCard title="AQI (MQ135)" value={latestData.mq135?.integerValue || "N/A"} />
    </Grid>
  ) : (
    <Typography>Login to view AQI data.</Typography>
  )}
  
  <Footer />


export default Dashboard;