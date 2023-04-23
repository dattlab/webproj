// ----- Load plugins
const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
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

// ----- Connect to MongoDB
const mongodbURL = "mongodb://127.0.0.1:27017/tasksDB";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongodbURL);
}

// ----- Schema for tasks
const tasksSchema = new mongoose.Schema({ "name": String, "categ": String });

// ----- Collections for tasks
const Task = mongoose.model("Task", tasksSchema);

// ----- Add data to Task collection
const item1 = new Task({ name: "Welcome to DaTodo!", categ: "default" });
const item2 = new Task({ name: "Below, add new task with + button", categ: "default" });
const item3 = new Task({ name: "Hit checkbox to delete this task", categ: "default" });

const defaultTaskList = [item1,item2,item3];


Task.find()
    .then(function (foundTasks) {
      if (foundTasks.length === 0) {
        Task.insertMany(defaultTaskList)
            .then(function () {
              console.log("Successfully added default task list");
            })
            .catch(function (err) {
              console.log(err);
            });
      }
    })
    .catch(function (err) {
      console.log(err);
    })


// ----- Global variables
const dayReadable = date.getDateInfo().dayReadable;
const isWeekend = date.getDateInfo().isWeekend;

// ----- Get-Post for main page
app.get("/:customTaskListName", (req, res) => {
  let categ = req.params.customTaskListName || "today";

  Task.find()
      .then(function (foundTasks) {
        const taskList = foundTasks.filter((task) => {
          if (task.categ === categ || task.categ === "default") {
            return task.name;
          }
        });
        res.render("list", {
          dayReadable: dayReadable,
          isWeekend: isWeekend,
          categ: categ,
          taskList: taskList
        });
      })
      .catch(function (err) {
        console.log(err);
      });

})

app.post("/", (req, res) => {
  const newTask = req.body.newTask;
  const categ = req.body.list;

  let redirectPage = "/";

  if (newTask !== "") {
    const task = new Task({ name: newTask, categ: categ, });
    task.save();

    if (categ === "work") {
      redirectPage = "/work";
    }
  }

  res.redirect(redirectPage);

});

app.post("/delete", (req, res) => {
  const [categ, checkedTaskID] = req.body.checkBox.split("-");

  Task.findByIdAndRemove(checkedTaskID)
      .then(() => {
        res.redirect(categ === "personal" ? "/" : `/${categ}`);
      })
      .catch((err) => {
        console.log(err);
      });
})

// ----- Port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

