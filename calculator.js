// Load plugins
const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

app.post("/", (req, res) => {
  let postData = req.body;

  res.send(`Sum = ${Number(postData.num1) + Number(postData.num2)}`);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

