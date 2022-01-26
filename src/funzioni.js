const axios = require("axios");
const _ = require("lodash");
const url = "https://api.waqi.info/search";
const urlGeoLoacation = "https://api.waqi.info/feed/geo:";
const input = document.querySelector("input");
const form = document.querySelector("form");
const msg = document.querySelector(".msg");
const TOKEN = process.env.TOKEN;

const showPosition = async (position) => {
  const coord = position.coords;
  const lat = coord.latitude;
  const lgn = coord.longitude;
  try {
    const respo = await axios(
      `${urlGeoLoacation}${lat};${lgn}/?token=${TOKEN}`
    );
    const data = _.get(respo, "data.data", "DEFAULT");
    const aqi = data.aqi;
    const name = data.city.name;
    const time = new Date();
    const urlInfo = data.city.url;
    const temp = data.iaqi.t.v;
    const li = document.createElement("li");
    const list = document.querySelector(".list");
    const descrip = `<div class="rounded-md bg-opacity-75 bg-blue-500">
    <h2 class="text-xl">Your position is near the station:</h2>
    <h2 class="text-2xl capitalize text-white">${name}</h2>
    <div class="flex flex-col text-center">
    <h2>AQI:</h3> 
    <h3 class="text-5xl  text-white">${aqi}</h3>
    <h3>Temp: ${temp}°</h3>
    <h3>Day: ${time.toDateString()}</h3>
    <h3 class="underline"><a href=${urlInfo}>For more info!</a></h3>
    </div>`;
    li.innerHTML = descrip;
    list.insertBefore(li, list.childNodes[0]);
    form.reset();
    msg.textContent = "";
  } catch (error) {
    console.log(error);
  }
};

export const geoLocation = async () => {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch (error) {
    console.log(error);
  }
};

export const getPollution = async () => {
  try {
    const respo = await axios(`${url}/?token=${TOKEN}&keyword=${input.value}`);
    console.log(respo);
    const data = _.get(respo, "data.data[0]", "DEFAULT");
    const aqi = data.aqi;
    const time = new Date();
    const li = document.createElement("li");
    const list = document.querySelector(".list");
    const descrip = `<div class="${
      aqi == "-"
        ? "bg-gray-400"
        : aqi <= 50
        ? "bg-green-500"
        : aqi > 50 && aqi <= 100
        ? "bg-yellow-200"
        : aqi > 100 && aqi <= 150
        ? "bg-yellow-500"
        : aqi >= 151 && aqi <= 200
        ? "bg-red-500"
        : aqi >= 201 && aqi <= 300
        ? "bg-indigo-700"
        : "bg-yellow-900"
    } rounded-md bg-opacity-75">
  <h2 class="text-2xl capitalize">${input.value}</h2>
  <div class="flex flex-col text-center">
  <h3>AQI</h3> 
  <h3 class="text-5xl">${aqi}</h3>
  <h3 class="text-5xl">${
    aqi == "-"
      ? "undefined"
      : aqi <= 50
      ? "Good"
      : aqi > 50 && aqi <= 100
      ? "Moderate"
      : aqi > 100 && aqi <= 150
      ? "Unhealthy for Sensitive Groups"
      : aqi >= 151 && aqi <= 200
      ? "Unhealthy"
      : aqi >= 201 && aqi <= 300
      ? "Very Unhealthy"
      : "Hazardous"
  }</h3>
  </div>
  <h3>Day: ${time.toDateString()}</h3>
  </div>`;
    li.innerHTML = descrip;
    list.insertBefore(li, list.childNodes[0]);
    form.reset();
    msg.textContent = "";
  } catch (error) {
    form.reset();
    msg.textContent = "Mi dispice non riusciamo a trovare dati della cittá😩";
  }
};
