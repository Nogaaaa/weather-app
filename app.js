// State
let currCity = "London";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__Realfeel = document.querySelector(".weather__Realfeel");
let weather__Humidity = document.querySelector(".weather__Humidity");
let weather__Wind = document.querySelector(".weather__Wind");
let weather__Pressure = document.querySelector(".weather__Pressure");

// Search
document.querySelector(".weather__search").addEventListener('submit', e => {
  let search = document.querySelector(".weather__searchform");
  // Prevent default action 
  e.preventDefault();
  // Change current city
  currCity = search.value;
  // Get weather forecast
  getWeather();
  //clear form
  search.value=""
});

// Units
// For Celsius
document.querySelector(".weather__units_celsius").addEventListener('click', () => {
  if (units !== "metric") {
    // Change to metric
    units = "metric";
    // Get weather forecast
    getWeather();
  }
});

// For Fahrenheit
document.querySelector(".weather__units_fahrenheit").addEventListener('click', () => {
  if (units !== "imperial") {
    // Change to imperial
    units = "imperial";
    // Get weather forecast
    getWeather();
  }
});

function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600; // Convert seconds to hours

  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// Convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(['en'], { type: "region" });
  return regionNames.of(country);
}

function getWeather() {
  const API_KEY = 'edbfa48ba3eed4584aa4c51a1bbc3cb9';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;

      // Set the weather icon as HTML content
      weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon">`;

      // Set the weather minmax HTML content with the correct method name
      weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;

      // Corrected property names as i had a few mistakes at first 
      weather__Realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weather__Humidity.innerHTML = `${data.main.humidity}%`;
      weather__Wind.innerHTML = `${data.wind.speed}${units === "imperial" ? "mph" : "m/s"}`; // Units condition added
      weather__Pressure.innerHTML = `${data.main.pressure}hPa`;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

document.addEventListener('DOMContentLoaded', getWeather);








