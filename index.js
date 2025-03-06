const key= config.WEATHER_API_KEY;
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".details img");
const detailsSection = document.querySelector(".details");
const errorMsg = document.querySelector(".errorMsg");


const weatherIcons = {
  Clouds: "images/cloudy.png",
  Clear: "images/clear.png",
  Rain: "images/rainy.png",
  Mist: "images/mist.png",
  Snow: "images/snow.png",
};

async function weatherApi(city) {
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`${URL}${city}&appid=${key}`);

    if (!response.ok) {
      errorMsg.style.display = "block";
      detailsSection.style.display = "none";
      return;
    }

    const data = await response.json();
    
    document.querySelector(".climate").textContent = data.weather[0].main;
    document.querySelector(".cityname").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".Humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    
    if (weatherIcons[data.weather[0].main]) {
      weatherIcon.src = weatherIcons[data.weather[0].main];
      Object.assign(weatherIcon.style, {
        width: "10rem",
        mixBlendMode: "multiply",
      });
    }

    
    detailsSection.style.display = "block";
    errorMsg.style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


searchBtn.addEventListener("click", () => weatherApi(searchBox.value));
