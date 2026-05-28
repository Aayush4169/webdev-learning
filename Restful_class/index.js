const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/view"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
let posts = [
  {
    id: uuidv4(),
    username: "Aayush Yadav",
    content: "Never Give UP",
  },
  {
    id: uuidv4(),
    username: "parul University",
    content: "yaha sab Possible hai",
  },
  {
    id: uuidv4(),
    username: "chennai super king ",
    content: " Thala for  a reason",
  },
];

app.get("/", (req, res) => {
  res.send("welcome to  HOme page ");
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("show.ejs", { post });
});
app.get("/posts/:id/new", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`app is listening at port number ${port} `);
});
