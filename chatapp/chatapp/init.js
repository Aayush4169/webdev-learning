const mongoose = require("mongoose");
const chat = require("./models/chat.js");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
  .then((data = console.log("connectio is succesfull")))
  .catch((err) => console.log("error"));

const chats = [
  {
    from: "Aayush",
    to: "Rahul",
    msg: "Hello Rahul!",
    created_at: new Date(),
  },
  {
    from: "Rahul",
    to: "Aayush",
    msg: "Hi Aayush, how are you?",
    created_at: new Date(),
  },
  {
    from: "Parul University",
    to: "Aayush",
    msg: "Your class starts at 10 AM.",
    created_at: new Date(),
  },
  {
    from: "CSK",
    to: "Aayush",
    msg: "Thala for a reason!",
    created_at: new Date(),
  },
];

chat.insertMany(chats).then((data) => console.log(data));
