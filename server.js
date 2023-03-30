const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
})

app.get("/contact", (req, res) => {
  res.send("<h1>Contact</h1>");
})

app.get("/about", (req, res) => {
  res.send(`<h1>About</h1> <p>${aboutMe}</p>`);
})

app.get("/posts", (req, res) => {
  res.send(`<h1>Posts</h1> <p>New post</p>`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

