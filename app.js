const express = require('express');
const app = express();
const dotenv= require("dotenv");
const mongoose= require("mongoose");


//improt routes
const blogRoute= require("./routes/blog");


dotenv.config();
//connect to db
mongoose.connect(process.env.DB_LINK,
    { useUnifiedTopology: true,
    useNewUrlParser: true }
).then(()=>{
    console.log("connected to db...");
}).catch(err=>{
    console.log(err);
});


//middlewares
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the main page");
})

//middlewares routes

app.use("/api", blogRoute);


//listen to a port
let port = process.env.PORT || 5000;
app.listen(port,() => console.log("server is up and running..."));

