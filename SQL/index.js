const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

let createRandomUser = () => {
  return [
    faker.number.int({ min: 1, max: 100000 }),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// create the mysql connection

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "aayushyadav4169@",
});
let data = [];
for (let i = 0; i < 100; i++) {
  data[i] = createRandomUser();
}

try {
  connection.query("show tables", (err, result) => {
    if (err) throw err;
    console.log(result); // resullt is return it is an array of obhect
  });
} catch (err) {
  console.log(err);
}
let q = "INSERT INTO user (id,username,email,password) Values ?";
// let user = [
//   [123, "aayush", "aaushahir123@gmail.com", "aayush123@"],
//   [124, "ved", "ved henecha123@gmail.com", "ved123@"],
// ];
// try {
//   connection.query(q, [user], (err, result) => {
//     if (err) throw err;
//     console.log(result); // resullt is return it is an array of obhect
//   });
// } catch (err) {
//   console.log(err);
// }
// insert data in bulk
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result); // resullt is return it is an array of obhect
  });
} catch (err) {
  console.log(err);
}

connection.end();
