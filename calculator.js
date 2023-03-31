// Load plugins
const express = require("express");
const app = express();
const port = 3000;

// Use express body parser ---------------------------
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Get-Post for main page ---------------------------
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})


// Get-Post for adder ---------------------------
app.get("/adder", (req, res) => {
  res.sendFile(`${__dirname}/adder.html`);
})
app.post("/adder", (req, res) => {
  let firstNum = Number(req.body.num1);
  let secondNum = Number(req.body.num2);

  res.send(`Sum = ${firstNum + secondNum}`);
});


// Get-Post for BMI ---------------------------
app.get("/bmi", (req, res) => {
  res.sendFile(`${__dirname}/bmi.html`);
})
app.post("/bmi", (req, res) => {
  let inputWeight = Number(req.body.weight);
  let inputHeight = Number(req.body.height) * 0.01;
  let bmi = inputWeight / (inputHeight ** 2);

  res.send(`Your BMI is ${bmi}`);
});


// Port listener ---------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

