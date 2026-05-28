const apiKey = "e3592e4a566d05f4a24b636721bf6afe";

const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");


// SEARCH WEATHER USING CITY
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city !== ""){
        getWeatherByCity(city);
    }
    else{
        alert("Please enter a city name");
    }

});


// FETCH WEATHER BY CITY
async function getWeatherByCity(city){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if(data.cod === "404"){
        alert("City not found");
        return;
    }

    displayWeather(data);

}


// CURRENT LOCATION WEATHER
locationBtn.addEventListener("click", () => {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            position => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                getWeatherByLocation(lat, lon);

            },

            error => {

                alert("Location access denied or unavailable.");

            }

        );

    }
    else{

        alert("Geolocation is not supported by your browser.");

    }

});


// FETCH WEATHER USING LOCATION
async function getWeatherByLocation(lat, lon){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    displayWeather(data);

}


// DISPLAY WEATHER DATA
function displayWeather(data){

    cityName.innerText = data.name;

    temperature.innerText =
    `${Math.round(data.main.temp)}°C`;

    description.innerText =
    data.weather[0].description;

    humidity.innerText =
    `${data.main.humidity}%`;

    wind.innerText =
    `${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    changeBackground(data.weather[0].main);

}

// CHANGE BACKGROUND BASED ON WEATHER
function changeBackground(weatherCondition){

    const body = document.body;

    switch(weatherCondition){

        case "Clear":
            body.style.background =
            "linear-gradient(135deg,#f7971e,#ffd200)";
            break;

        case "Clouds":
            body.style.background =
            "linear-gradient(135deg,#757f9a,#d7dde8)";
            break;

        case "Rain":
        case "Drizzle":
            body.style.background =
            "linear-gradient(135deg,#4b79a1,#283e51)";
            break;

        case "Thunderstorm":
            body.style.background =
            "linear-gradient(135deg,#232526,#414345)";
            break;

        case "Snow":
            body.style.background =
            "linear-gradient(135deg,#e6dada,#274046)";
            break;

        case "Mist":
        case "Haze":
        case "Fog":
            body.style.background =
            "linear-gradient(135deg,#606c88,#3f4c6b)";
            break;

        default:
            body.style.background =
            "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
    }

}