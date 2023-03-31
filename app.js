// Load plugins
const express = require("express");
const https = require("https");

// Create express instance
const app = express();
const port = 3000;

const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
const appID = "9ecf957ed3df3456f632767e5b0f93d3";

// Use express body parser ---------------------------
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Load public files ---------------------------
app.use(express.static(`${__dirname}/public`));


// Get-Post for main page ---------------------------
app.get("/", (req, res) => {
  let city = "quezon+city";
  let countryCode = "ph";
  let units = "metric";
  let getURL = `${apiEndpoint}?q=${city},${countryCode}&units=${units}&appid=${appID}`;

  https.get(getURL, (response) => {
    console.log(response)
  })

  res.sendFile(`${__dirname}/index.html`);
})


// Port listener ---------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

