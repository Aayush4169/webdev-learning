const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");
const expressError = require("./customerror.js");
//  parse the data
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// establish the connnection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
  .then((data) => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log("error in connection");
  });

app.get("/", (req, res) => {
  res.send("root is working");
});
// index route showing all the chatsss
app.get("/chats", async (req, res, next) => {
  try {
    const chats = await chat.find();
    res.render("show.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

//  add new chat form
app.get("/chats/new", (req, res, next) => {
  res.render("newdata.ejs");
});

//add new chat
app.post("/chats", async (req, res, next) => {
  try {
    let { from, msg, to } = req.body;
    let newChat = new chat({
      from: from,
      msg: msg,
      to: to,
      created_at: new Date(),
    });

    await newChat.save();

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//  this route open a form for edit thechat
app.get("/chats/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let edchat = await chat.findById(id);

    res.render("edit.ejs", { edchat });
  } catch (err) {
    next(err);
  }
});

// update the edit the chatt
app.put("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { msg } = req.body;
    let updatechat = await chat.findByIdAndUpdate(
      id,
      { msg: msg, updated_at: new Date() },
      { runValidators: true, new: true },
    );
    console.log(updatechat);
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});
// destroy the chat
app.delete("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let delchat = await chat.findByIdAndDelete(id);
    console.log(delchat);
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

//  new route for error handlingggg

app.get("/chats/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let schat = await chat.findById(id);
    // if (!schat) {
    //   next(new expressError(500, "chat not found"));
    // }
    res.render("edit.ejs", { schat });
  } catch (err) {
    next(err);
  }
});
app.use((err, req, res, next) => {
  let { status = 400, message = "not found" } = err;
  res.status(status).send(message);
});

app.listen(port, (req, res) => {
  console.log(`app is listeing on port  ${port} `);
});
