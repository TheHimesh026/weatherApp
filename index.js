const windSpeedElement = document.querySelector(".wind-speed");
const locationElement = document.querySelector(".location");
const conditionElement = document.querySelector(".condition");
const temperatureElement = document.querySelector(".temp");
const pressureElement = document.querySelector(".pressure");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility");
const weatherIconElement = document.querySelector(".weather-icon");
const popUpElement = document.querySelector(".popup-container");
const popUpMsg = document.querySelector(".popup-msg");
const bodyElement = document.querySelector("body");
const popUpBtnElement = document.querySelector(".popup-btn");
const inputValue = document.querySelector(".input-box");
const accessKey = 'aef03656412300f52dd1f17278037c96';

//Global variable
let weatherInfo;
let windInfo;
let cloudsInfo;
let rainInfo;
let visibilityInfo;
let conditionInfo;
let locationInfo;
let dataError;

function startProcess(){
   let city = inputValue.value;
   let URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${accessKey}`;
   fetchWeatherData(URL);
}

function fetchWeatherData(URL) {
  try{
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      dataError = data.cod;
      weatherInfo = data.weather[0];
      windInfo = data.wind;
      rainInfo = data.rain;
      visibilityInfo = data.visibility
      conditionInfo = data.main;
      locationInfo = data.name;
      showWeatherData();
    })
    .catch((error) => {
     // console.log(error);
      popUp(error);
    })
  }
  catch{}
}

function showWeatherData() {
  temperatureElement.innerText = Math.floor(conditionInfo.temp) + "°c";
  locationElement.innerText = locationInfo;
  humidityElement.innerText = conditionInfo.humidity + "%";
  windSpeedElement.innerText = windInfo.speed + "km/h";
  let upperCase = weatherInfo.description.charAt(0).toUpperCase();
  let lowerCase = weatherInfo.description.slice(1);
  conditionElement.innerText = upperCase + lowerCase;
  visibilityElement.innerText = visibilityInfo >= 1000 ? visibilityInfo / 1000 + "km" : visibilityInfo + "m";
  renderIcons(weatherInfo.icon);
}

function renderIcons(icon){
  if(icon === "01d" || icon === "01n"){ // Clear sky done
    if(icon === "01d"){
      weatherIconElement.src = "./source/images/clear-day.png";
    } else{
      weatherIconElement.src = "./source/images/clear-night.png";
    }
    
  } else if(icon === "02d" || icon === "02n"){ // Few clouds done
    if(icon === "02d"){
      weatherIconElement.src = "./source/images/fewcloud-day.png";
    } else {
      weatherIconElement.src = "./source/images/fewcloud-night.png";
    }
    
  } else if(icon === "03d" || icon === "03n"){ // Scattered clouds done
     if(icon === "03d"){
       weatherIconElement.src = "./source/images/scatteredcloud-day.png";
     }
    else{
      weatherIconElement.src = "./source/images/scatteredcloud-night.png";
    }
    
  } else if(icon === "04d" || icon === "04n"){ // Broken clouds done
    if(icon === "04d"){
      weatherIconElement.src = "./source/images/brokencloud.png";
    } else{
      weatherIconElement.src = "./source/images/brokencloud.png";
    }
    
  } else if(icon === "09d" || icon === "09n"){ // Shower rain done
     if(icon === "09d"){
       weatherIconElement.src = "./source/images/rainy-day.png";
     }
     else{
       weatherIconElement.src = "./source/images/rainy-night.png";
     }
     
  } else if(icon === "10d" || icon === "10n"){ // Rain done
     if(icon === "10d"){
       weatherIconElement.src = "./source/images/rainy-day.png";
     }
     else{
       weatherIconElement.src = "./source/images/rainy-night.png";
     }
     
  } else if(icon === "11d" || icon === "11n"){ // Thunderstorm done
     if(icon === "11d"){
       weatherIconElement.src = "./source/images/lightning-day-night.png";
     }
     else{
       weatherIconElement.src = "./source/images/lightning-day-night.png";
     }
     
  } else if(icon === "13d" || icon === "13n"){ // Snow done
     if(icon === "13d"){
       weatherIconElement.src = "./source/images/snakeflake-day.png";
     }
     else{
       weatherIconElement.src = "./source/images/snowflake-night.png";
     }
     
  } else if(icon === "50d" || icon === "50n"){ // Mist done
     if(icon === "50d"){
       weatherIconElement.src = "./source/images/mist-day.png";
     }
     else{
       weatherIconElement.src = "./source/images/mist-night.png";
     }
  } else{
    weatherIconElement.src = "./source/cloud.gif";
  }
}

function popUp(errorType){
  if(dataError === "400"){
    popUpMsg.innerText = `Input Value is empty!`;
  } else if(dataError === "404"){
    popUpMsg.innerText = `You have entered city of unknown planet! Please consider changing it to Earth's.`;
  } else if(errorType.message === "Failed to fetch"){
    popUpMsg.innerText = `You don't have access to internet connection!
    Please try again after turning it on`;
  } else if(errorType === "1"){
    popUpMsg.innerText = `Permission is not enabled.
    We will try again.`;
    popUpBtnElement.classList.add("hidden");
  } else if(errorType === "2"){
    popUpMsg.innerText = 
    `Your browser either don't support location grant or you have disabled it.
    Please fix and try again`;
  } else {
    popUpMsg.innerText = `Error Occurred ${errorType}`;
  }
  bodyElement.classList.remove("p-2");
  popUpElement.classList.remove("hidden");
  setTimeout(() => {
    popUpElement.classList.add("hidden");
    bodyElement.classList.add("p-2");
  },2000)
}

fetchUsingLocation();
 function fetchUsingLocation(msg){
 if ("geolocation" in navigator) {
   navigator.geolocation.getCurrentPosition(function(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
    let URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${accessKey}`;
  fetchWeatherData(URL)},
  
  function(error) {
   popUp("1"); //blocked
})
} else{
  popUp("2"); //not supported 
}
}