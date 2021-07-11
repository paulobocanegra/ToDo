const mongoose = require('mongoose')
const express = require("express");
const passport = require("passport");
const users = require("./routes/api/users")
const todos = require("./routes/api/todos")
const bodyParser = require('body-parser')
const app = express();
const db = require('./config/keys').mongoURI
require("./config/passport")(passport)
app.use(passport.initialize());

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
    app.use("/api/users", users);
    app.use("/api/todos", todos);
    
    

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));