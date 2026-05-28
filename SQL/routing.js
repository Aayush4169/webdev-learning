const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require("uuid");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
// estapblish path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
let createRandomUser = () => {
  return [
    faker.number.int({ min: 1, max: 100000 }),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "aayushyadav4169@",
});
app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      // resullt is return it is an array of obhect
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

// fetch all user and display
app.get("/users", (req, res) => {
  let q = "select * from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result;
      res.render("show.ejs", { data });
    });
  } catch (err) {
    console.log(err);
  }
});
//  route the will return form to editt
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select* from user where id= '${id}' `;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      res.render("edit.ejs", { data });
    });
  } catch (err) {
    res.send("err in database");
  }
});
// route wth patch update the username;
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: formusername } = req.body;
  let { password: formpassword } = req.body;
  let q = `select* from user where id= ${id}`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let data = result[0];
      let q2 = `update  user set username ='${formusername}' where id=${id}`;
      if (formpassword != data.password) {
        res.send("wrong password");
      } else {
        try {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/users");
          });
        } catch (err) {
          res.send("error occur");
        }
      }
    });
  } catch (err) {
    res.send("err in database");
  }
});

// try {
//   connection.query("show tables", (err, result) => {
//     if (err) throw err;
//     console.log(result); // resullt is return it is an array of obhect
//   });
// } catch (err) {
//   console.log(err);
// }

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`app is listening on port ${port}`);
});
///connection.end();
