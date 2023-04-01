// Load plugins
const express = require("express");
const https = require("https");

// Create express instance
const app = express();
const port = 3000;

const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
const iconURLBase = "https://openweathermap.org/img/wn"
const apiKey = "9ecf957ed3df3456f632767e5b0f93d3";

// Use express body parser ---------------------------
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Load public files ---------------------------
app.use(express.static(`${__dirname}/public`));


// Get-Post for main page ---------------------------
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);

})
app.post("/index.html", (req, res) => {
  
  let city = capitalize(req.body.cityName);
  let units = "metric";
  let getURL = `${apiEndpoint}?q=${city.replace(/ /g, "+")}&units=${units}&appid=${apiKey}`;

  https.get(getURL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      const countryCode = weatherData.sys.country;
      const cityTemp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const windDirection = getWindDirection(weatherData.wind.deg);
      const icon = weatherData.weather[0].icon;
      const iconURL = `${iconURLBase}/${icon}@2x.png`;

      res.send(`
        <hr>
        <div class="weather-card">
          <img src="${iconURL}" alt="weather icon" name="weather icon">
          <h1>${city} <span style="font-size: 1.2rem">${getFlagEmoji(countryCode)} ${countryCode}</span></h1>
          <p><strong>Temperature (C):</strong> ${cityTemp}</p>
          <p><strong>Description:</strong> ${weatherDesc}</p>
          <p><strong>Wind direction:</strong> ${windDirection}</p>
        </div>
        <hr>
      `);
    });
  });

});

// Port listener ---------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


// Functions ---------------------------
function capitalize(str) {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }

  return words.join(" ");
}

function getWindDirection(angle) {
  const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
  return directions[Math.round(angle / 45) % 8];
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

