// Weather App
// Cole Benyshek - January 2022
// Modeled after project from Dev Ed:
// https://www.youtube.com/watch?v=wPElVpR1rwA&t=2s
// API source: https://www.weatherapi.com/"

// On window load
window.addEventListener(
  "load",
  () => {
    let long;
    let lat;
    let locationTimezone = document.querySelector(".location-timezone");
    let locationIcon = document.querySelector(".location-icon");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureUnit = document.querySelector(".unit");
    let temperatureDescription = document.querySelector(
      ".temperature-description"
    );
    let degreeSection = document.querySelector(".degree-section");

    // check if current location is retrievable via geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        // API string
        const api = `http://api.weatherapi.com/v1/current.json?key=a03ad431f50441a592d54409220801&q=${lat},${long}&aqi=no`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const { temp_c, temp_f } = data.current;
            const { text, icon } = data.current.condition;
            const { name, region } = data.location;

            // Set DOM elements from the API data
            temperatureDegree.innerHTML = temp_f;
            temperatureDescription.innerHTML = text;
            locationTimezone.innerHTML = `${name},<br>${region}`;

            // Extract string information for appropriate icon
            // ex: icon info returned as '//cdn.weatherapi.com/weather/64x64/night/122.png'
            const iconInfo = icon.split("/");
            const timeOfDay = iconInfo[iconInfo.length - 2];
            const image = iconInfo[iconInfo.length - 1];
            createIcon(timeOfDay, image);

            // Add Fahrenheit/Celcius capabilites to temperature
            degreeSection.addEventListener(
              "click",
              (e) => {
                changeDegrees(e, temp_f, temp_c);
              },
              false
            );
          });

        // Create img element for icons
        function createIcon(time, img) {
          let icon = document.createElement("img");
          icon.classList.add("icon");
          icon.src = "./images/" + time + "/" + img;
          icon.alt = "depection of current weather";
          locationIcon.appendChild(icon);
        }

        // Toggle between Fahrenheit and Celsius
        function changeDegrees(currentEvent, tempF, tempC) {
          const wrapper = currentEvent.currentTarget;
          wrapper.classList.toggle("celsius");
          if (wrapper.classList.contains("celsius")) {
            temperatureDegree.innerHTML = tempC;
            temperatureUnit.innerHTML = "°C";
          } else {
            temperatureDegree.innerHTML = tempF;
            temperatureUnit.innerHTML = "°F";
          }
        }
      });
    } else {
      alert("Current location unable to be resolved. Check browser settings.");
    }
  },
  false
);
