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

// ----- Set EJS
app.set("view engine", "ejs");

// ----- Global variables

// ----- Get-Post for main page
app.get("/", (req, res) => {
  res.render("home");
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/contact", (req, res) => {
  res.render("contact")
})

// app.post("/", (req, res) => {
// });



// ----- Port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

