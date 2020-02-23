//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const homeStartingContent = "<p>This is not the first blog post<em><strong>. This was hard-coded to avoid emptiness on the page.</strong></em>. To add a post, click on the "+" beside the contact us menu. Note that you won't be able to update or delete at this moment for personal reason. This site was made under 24hrs, but the update can take eternity, ofcourse. I will update the content every now and then so don't worry about the mess or mistakes you make trying to post. The rest is Lorem Ipsum Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.</p>";
const startHead = "<h1>My First Blog Site</h1>";
const aboutContent = "<p>Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>";
const contactContent = "<p>Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.</p>";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const blog = [];


app.get("/", function (req, res) {
  dateAdded = date.getDate().toString()
  res.render("home", {homestart: homeStartingContent, startHead: startHead, x: blog, dateAdded: dateAdded});
});

app.get("/about", function (req, res) {
  res.render("about", {about: aboutContent});
});

app.get("/contact", (req, res) => res.render("contact", {contact: contactContent}));

app.get("/compose", (req, res) => res.render("compose"));


app.get("/post/:route/", function(req, res){

const reqFile = _.toLower(req.params.route);

blog.forEach(function(x){
  const lowerTitle = _.toLower(x.title);

if(reqFile === lowerTitle)
  {
    res.render("post" , {title : x.title, content: x.body, added: x.dateAdded, author: x.author});
}
})
})


app.post("/compose", function (req, res) {
  let post = {
    title : req.body.postTitle,
    body : req.body.postBody,
    dateAdded : date.getDate().toString(),
    author : req.body.author
  }
  blog.push(post);
  res.redirect("/")
})





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
