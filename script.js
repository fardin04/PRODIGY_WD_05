const API_Key = "a80d012a1fc1a1ed695d1b56c2b49139";
const API_Url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");
const ErrorMsg = document.querySelector(".error");

async function CheckWeather(city) {
  try {
    const response = await fetch(`${API_Url}${city}&appid=${API_Key}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    const weatherCondition = data.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case "clouds":
        WeatherIcon.src = "clouds.png";
        break;
      case "clear":
        WeatherIcon.src = "clear.png";
        break;
      case "drizzle":
        WeatherIcon.src = "drizzle.png";
        break;
      case "rain":
        WeatherIcon.src = "rain.png";
        break;
      case "snow":
        WeatherIcon.src = "snow.png";
        break;
      case "wind":
        WeatherIcon.src = "wind.png";
        break;
    }

    ErrorMsg.style.display = "none";
  } catch (error) {
    ErrorMsg.style.display = "block";
    console.error(error.message);
  }
}

SearchBtn.addEventListener("click", () => {
  CheckWeather(SearchBox.value);
});

CheckWeather("Dhaka");
