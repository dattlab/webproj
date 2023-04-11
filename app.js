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

let taskList = [];

// ----- Get-Post for main page
app.get("/", (req, res) => {

  let today = new Date(); 
  let dateOpts = {
    weekday: "long",
    day: "numeric",
    month: "short"
  }

  let dayReadable = today.toLocaleString('en-US', dateOpts);

  let isWeekend = (today.getDay() == 6 || today.getDay() == 0) ? true : false;
  let status = (isWeekend) ? "Time to party!" : "Time to work.";

  res.render("list", {
    dayReadable: dayReadable,
    isWeekend: isWeekend,
    status: status,
    taskList: taskList
  });


})

app.post("/", (req, res) => {
  let newTask = req.body.newTask;

  if (newTask !== "" && !(count(taskList, newTask) === 1))
    taskList.push(req.body.newTask);

  res.redirect("/");

});

// ----- Port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

// ----- Functions
function count(arr, element) {
  /* Count number of specified element in array */
  return arr.filter(e => e === element).length;
}
