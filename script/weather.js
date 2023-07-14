let now = new Date();
function formatDate() {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = now.getDate();
  let year = now.getFullYear();

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}, ${month} ${date}, ${year} | ${hours}:${minutes}`;
}
formatDate();



function search(city){
  let apiKey = "c1d064fec08a911563t0obf723ba0dee";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}
search("Mombasa");

function loadCity(event) {
  event.preventDefault();
    let city= document.querySelector("#search").value;
    search(city);
  }
let form = document.querySelector("#search-form");
form.addEventListener("submit", loadCity);

//current temperature
function showCurrentWeather(response){
  console.log(response.data);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;

  let cityNameMini = document.querySelector("#city-name-mini");
  cityNameMini.innerHTML = response.data.city;

  celsiusValue = response.data.temperature.current;
  let temperature = Math.round(celsiusValue);
  let temp = document.querySelector("#temp-main");
  temp.innerHTML = `${temperature}`;
  
  let humidityValue = Math.round(response.data.temperature.humidity);
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${humidityValue}`;
  
  let feelsLikeValue  = Math.round(response.data.temperature.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feelsLikeValue}`;
  
  let windValue = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = `${windValue}`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.description);
}

function showLocation(position){
  let apiKey = "c1d064fec08a911563t0obf723ba0dee";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}
function currentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let current = document.querySelector("#current-weather-btn");
current.addEventListener("click", currentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureConvert = document.querySelector("#temp-main");
  let fahrenheitValue = Math.round((celsiusValue * 9)/5 + 32);
  temperatureConvert.innerHTML = fahrenheitValue;
}
let tempToFahrenheit = document.querySelector("#fahrenheit");
tempToFahrenheit.addEventListener("click", convertToFahrenheit);

let celsiusValue = null;

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureConvert = document.querySelector("#temp-main");
  temperatureConvert.innerHTML = Math.round(celsiusValue);
}

let tempToCelsius = document.querySelector("#celsius");
tempToCelsius.addEventListener("click", convertToCelsius);