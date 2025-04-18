async function fetchWeather(city = 'London') {
    try {
      const response = await fetch(`/api/weather?city=${city}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!response.ok) throw new Error('Failed to fetch weather data');
      return await response.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }