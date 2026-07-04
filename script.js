const apiKey = "b75cb937441a6f03c1019d51ddb60135";

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const date = document.getElementById("date");
const weatherIcon = document.getElementById("weather-icon");

function showDate() {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    date.innerHTML = today.toLocaleDateString("en-IN", options);

}

showDate();

async function getWeather(cityName) {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);

    if(response.status == 404){

        alert("City Not Found");
        return;

    }

    let data = await response.json();

    city.innerHTML = data.name + ", " + data.sys.country;

    temp.innerHTML = Math.round(data.main.temp) + "°C";

    condition.innerHTML = data.weather[0].main;

    humidity.innerHTML = data.main.humidity + "%";

    wind.innerHTML = data.wind.speed + " km/h";

    let weather = data.weather[0].main;

   if(weather == "Clouds"){

    weatherIcon.src = "images/cloudy.png";

}

else if(weather == "Clear"){

    weatherIcon.src = "images/sunny.png";

}

else if(weather == "Rain"){

    weatherIcon.src = "images/rainy-day.png";

}

else if(weather == "Drizzle"){

    weatherIcon.src = "images/rainy-day.png";

}

else if(weather == "Mist"){

    weatherIcon.src = "images/mist.png";

}

else if(weather == "Snow"){

    weatherIcon.src = "images/snowflake.png";

}

else if(weather == "Thunderstorm"){

    weatherIcon.src = "images/thunder.png";

}

}

searchBtn.addEventListener("click", function(){

    let cityName = searchBar.value;

    if(cityName == ""){

        alert("Please enter a city name");
        return;

    }

    getWeather(cityName);

});

searchBar.addEventListener("keypress", function(event){

    if(event.key == "Enter"){

        getWeather(searchBar.value);

    }

});

getWeather("Hyderabad");