const mongoose = require("mongoose");
const Chat = require("./models/Chat.js");

main().then(()=>console.log("connection successful"))
.catch((err)=> console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsup');
}

const chats = [
  {
    from: "Omkar",
    to: "Vikas",
    msg: "Hey, did you finish your project?",
    created_at: new Date()
  },
  {
    from: "Vikas",
    to: "Omkar",
    msg: "Yes, I’ll send it to you in the evening.",
    created_at: new Date()
  },
  {
    from: "Aditi",
    to: "Rahul",
    msg: "Are you coming to the meetup tomorrow?",
    created_at: new Date()
  },
  {
    from: "Rahul",
    to: "Aditi",
    msg: "Yes, I’ll be there at 5 PM.",
    created_at: new Date()
  },
  {
    from: "Sneha",
    to: "Omkar",
    msg: "Don’t forget about our assignment submission!",
    created_at: new Date()
  }
];


Chat.insertMany(chats);