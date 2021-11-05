import { geoLocation, getPollution } from "./funzioni";

const send = document.querySelector("#send");
const location = document.querySelector("#location");

send.addEventListener("click", (e) => {
  e.preventDefault();
  getPollution();
});

location.addEventListener("click", (e) => {
  e.preventDefault();
  geoLocation();
});
