let now = new Date();
let date = now.getDate();
let year = now.getFullYear()
let days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
];
let months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec"
];

let month = months[now.getMonth()];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
   hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
   minutes = `0${minutes}`;
}

let currentTimeElement = document.querySelector("#current-time");
let currentDateElement = document.querySelector("#current-date");
currentTimeElement.innerHTML = `${hours}:${minutes}`;
currentDateElement.innerHTML = `${day}, ${date} ${month} ${year}`;

function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   return days[day];
}


function displayForecast(response) {
   console.log(response.data.daily);
   let forecast = response.data.daily;
   let forecastElement = document.querySelector("#forecast");
   let forecastHTML = `<div class="forecast__row">`;
   forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
         forecastHTML =
            forecastHTML +
            `
<div class="forecast__column">
<div class="forecast__day">${formatDay(forecastDay.dt)}</div>
<div class="forecast__icon">
<img class="icon" src="img/icons/${forecastDay.weather[0].icon}.svg" alt="forecast">
</div>
<div class="forecast__temperatures">
<span class="forecast__temperature-max">
   ${Math.round(forecastDay.temp.max)}°
</span>
<span class="forecast__temperature-min">
   ${Math.round(forecastDay.temp.night)}°
</span>
</div>
</div>
   `;
      }
   });
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
   console.log(forecastHTML);
}

function getForecast(coordinates) {
   console.log(coordinates);
   let apiKey = "d408beb6fdb204fdf27972516e99f835";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   console.log(apiUrl);
   axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
   //   let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city");
   let description = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let pressureElement = document.querySelector("#pressure");
   //   let dateElement = document.querySelector("#current-date");
   let iconElement = document.querySelector("#icon");

   celsiusElement = response.data.main.temp;
   // temperatureElement.innerHTML = Math.round(response.data.main.temp);
   cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
   description.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
   pressureElement.innerHTML = Math.round(response.data.main.pressure * 0.750062);
   //   dateElement.innerHTML = formatDate(response.data.dt * 1000);
   let iconW = response.data.weather[0].icon;
   iconElement.setAttribute(
      "src",
      `img/icons/${iconW}.svg`
   );
   iconElement.setAttribute("alt", response.data.weather[0].description);

   getForecast(response.data.coord);
}

function search(city) {
   let apiKey = "d408beb6fdb204fdf27972516e99f835";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayTemperature);
   console.log(apiUrl);
}

function handleSubmit(event) {

   event.preventDefault();
   let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
   
}

function searchLocation(position) {
   let apiKey = "d408beb6fdb204fdf27972516e99f835";
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let units = "metric";
   let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(displayTemperature);
}

// function getCurrentLocation(event) {
//    event.preventDefault();
//    navigator.geolocation.getCurrentPosition(searchLocation);
// }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", getCurrentLocation);

search("Albania");