const app = require('./app');

//listen to a port
let port = process.env.PORT || 5000;
app.listen(port,() => console.log("server is up and running..."));

