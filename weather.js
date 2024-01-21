document.addEventListener('DOMContentLoaded', function () {
  fetchWeatherForCity('Sundsvall');
});

function fetchWeatherForCity(city) {
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const tempMinMax = document.getElementById("tempMinMax");
  const weather = document.getElementById("weather");
  const weatherDescription = document.getElementById("weatherDescription");
  const wind = document.getElementById("wind");

  const apiKey = '580674dfbef72ef4ea665a4ee252dc36';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          cityName.innerText = data.name;
          temperature.innerText = `Temperature: ${data.main.temp}°C`;
          tempMinMax.innerText = `Min. & Max. temp: ${data.main.temp_min}°C / ${data.main.temp_max}°C`;
          weather.innerText = `Weather: ${data.weather[0].main}`;
          weatherDescription.innerText = `Weather Description: ${data.weather[0].description}`;
          wind.innerText = `Wind: ${data.wind.deg}° at ${data.wind.speed} m/s`;
      })
      .catch(error => console.error('Error fetching weather:', error));
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}