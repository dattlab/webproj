// ----- Load plugins
const express = require("express");
const https = require("https");

// ----- Create express instance
const app = express();
const port = 3000;

// ----- Use express body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// ----- Load public files
app.use(express.static(`${__dirname}/public`));


// ----- Get-Post for main page
app.get("/", (_, res) => {

  res.sendFile(`${__dirname}/index.html`);

})

app.post("/", (_, res) => {

  res.send();

});

// ----- Port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

