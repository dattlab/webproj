// Load plugins
const express = require("express");
const app = express();
const port = 3000;

// Use express body parser ---------------------------
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Load public files ---------------------------
app.use(express.static(`${__dirname}/public`));


// Get-Post for main page ---------------------------
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})


// Port listener ---------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

