const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
const PORT = 4000;
const DB_NAME = "Web_App"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var Profile1 = require("./routes/JobApps");
var Profile2 = require("./routes/RecData");

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

//Using sessions for login
app.use(session({
    secret: 'look hard',
    resave: false,
    saveUninitialized: false,
    duration: 60*1000*5,
    store: new MongoStore({
      mongooseConnection: connection
    }),
    token:'',
    role:''
}));


app.use(cors({ Origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/Info1",Profile1);
app.use("/Info2",Profile2);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
