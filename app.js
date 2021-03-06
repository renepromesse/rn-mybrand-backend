const express = require('express');
const app = express();
const dotenv= require("dotenv");
const mongoose= require("mongoose");


//improt routes
const blogRoute= require("./routes/blog");
const contactRoute= require("./routes/contact");
const loginRoute= require("./routes/login");
const messagesRoute= require("./routes/messages");
const read_commentRoute= require("./routes/read");
const articlesRoute= require("./routes/articles");

dotenv.config();
//connect to db
const connecting = async function () {
    await mongoose.connect(process.env.DB_LINK,
    { useUnifiedTopology: true,
    useNewUrlParser: true })
    .then(()=>{
        console.log("connected to db...");
    }).catch(err=>{
        console.log(err);
    });
}

connecting();

//middlewares
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the main page");
})

//middlewares routes

app.use("/api", blogRoute);
app.use("/api", contactRoute);
app.use("/api", loginRoute);
app.use("/api", messagesRoute);
app.use("/api", read_commentRoute);
app.use("/api", articlesRoute);

module.exports = app;
