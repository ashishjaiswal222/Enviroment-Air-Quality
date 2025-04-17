import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { fetchWeatherData } from "../utils/api";
const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data().fields,
    pm25: doc.data().fields.pm25?.integerValue || null,
  }));

const useSensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, "sensorData"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().fields,
      }));
      setSensorData(data);
    });

    fetchWeatherData().then(setWeatherData);

    return unsubscribe;
  }, []);

  return { sensorData, weatherData };
};

export default useSensorData;