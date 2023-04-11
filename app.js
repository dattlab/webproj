// ----- Load plugins
const express = require("express");
const https = require("https");
const date = require(`${__dirname}/date.js`);

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
const personalTasks = [];
const workTasks = [];

// ----- Get-Post for main page
app.get("/", (req, res) => {
  let categ = "personal"

  res.render("list", {
    dayReadable: date.getDateInfo().dayReadable,
    isWeekend: date.getDateInfo().isWeekend,
    categ: categ,
    taskList: personalTasks
  });
})

app.post("/", (req, res) => {
  let newTask = req.body.newTask;
  let redirectPage = "/";
  let temp = req.body.list === "personal" ? personalTasks : workTasks;

  if (newTask !== "" && !(temp.filter(e => e === newTask).length === 1)) {
    if (req.body.list === "personal") {
      personalTasks.push(req.body.newTask);
    }
    else {
      workTasks.push(req.body.newTask);
      redirectPage = "/work";
    }
  }

  res.redirect(redirectPage);
});

app.get("/work", (req, res) => {
  let categ = "work";

  res.render("list", {
    dayReadable: date.dayReadable,
    isWeekend: date.isWeekend,
    categ: categ,
    taskList: workTasks
  });
})

// ----- Port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

