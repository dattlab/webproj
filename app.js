// ----- Load plugins
const express = require("express");
const https = require("https");
const _ = require("lodash");

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
const posts = []
const opts = {
  posts: posts
}

// ----- Get-Post for main page
app.get("/", (req, res) => {
  res.render("home", opts);
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/contact", (req, res) => {
  res.render("contact")
})

app.get("/compose", (req, res) => {
  res.render("compose")
})

app.get("/posts/:postId", (req, res) => {
  let currentPosts = posts.map( post => _.kebabCase(post.title) );
  let postId = _.kebabCase(req.params.postId);

  if (currentPosts.includes(postId)) {
    let reqPost = posts[currentPosts.indexOf(postId)];

    res.render("post", reqPost);
  }
})

app.post("/", (req, res) => {
  if (req.body.newPostTitle != "" && req.body.newPostContent != "") {
    let postData = {
      title: req.body.newPostTitle,
      content: req.body.newPostContent
    }

    posts.push(postData);

    res.redirect("/");
  }

});


// ----- Port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
