const express = require('express');
const app = express();
const dotenv= require("dotenv");
const mongoose= require("mongoose");


//improt routes
// const authRoute= require("./routes/auth");
// const contactRoute= require("./routes/contact");
// const loginRoute= require("./routes/login");
// const messageRoute= require("./routes/messages");
// const articlesRoute= require("./routes/articles");
const blogRoute= require("./routes/blog");
// const readRoute= require("./routes/read");
// const notFoundRoute= require("./routes/404");


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
//app.use("/", authRoute);
// app.use("/",contactRoute);
// app.use("/",loginRoute);
// app.use("/",messageRoute);
// app.use("/", articlesRoute);
app.use("/api", blogRoute);
// app.use("/", readRoute);
// return 404 in case of unknown routes
// app.use("/",(req,res)=>{
//     res.status(404).send("Request not available");
// })

// app.get('/contact',(req,res) =>{
//     res.send({message:"this is the contact page"});
// });


// require("./app/routes/blog")(app);










let port = process.env.PORT || 5000;
app.listen(port,() => console.log("server is up and running..."));

