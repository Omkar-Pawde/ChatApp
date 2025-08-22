const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/Chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>console.log("connection successful"))
.catch((err)=> console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsup');
}

//Index Route
app.get("/chat", async(req, res)=>{
  let chats = await Chat.find()
  res.render("index.ejs", {chats});
});

//New Route
app.get("/chat/new", (req, res)=>{
  res.render("new.ejs");
});

//create route
app.post("/chat", (req, res)=>{
 let { from, to, msg} = req.body;
 let newChat = new Chat({
  from: from,
  to: to,
  msg: msg,
  created_at: new Date(),
  });

  newChat.save().then(()=>{
   res.redirect("/chat");
   console.log("data was saved in DB");
  })
  .catch((err)=>{
    console.log(err);
   });
 });

//Edit Route

app.get("/chat/:id/edit", async(req, res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit", {chat});
});

//Update Route 

app.put("/chat/:id", async(req, res)=>{
   let {id} = req.params;
   let {msg : newMsg} = req.body;
   console.log(newMsg);
   let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators:true , new:true});
   
   console.log(updatedChat);
   res.redirect("/chat");
});


//delete route

app.delete("/chat/:id", async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chat");
});

//sample data
app.get ("/", (req, res)=>{
    res.send("root is working");
});

app.listen(8080, ()=>{
console.log("server is  listing on the port 8080");
});
