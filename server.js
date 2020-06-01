const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const firebase = require('firebase-admin');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const app = express();



//module imports
const auth = require('./routes/auth');
const user = require("./routes/user");
const blog = require("./routes/blog");


// middleware setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(cookieparser());


//Database configuration

// mongoDb
mongoose.connect("mongodb+srv://surendra:surendra14@cluster0-m7gbl.mongodb.net/Blog?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected...'))
    .catch(e => console.log(e));




//app routing
app.use('/api', auth);
app.use('/api', user);
app.use('/api', blog);


// server and port configuration
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, () => console.log("Server connected"));






