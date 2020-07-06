const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const cors = require("cors");

var corsOptions = {
    origin: 'http://localhost:3000',
}

//Requiring routes
const authUser = require("./routes/auth");
const level = require("./routes/levels");

mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})

app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());
app.use("/user",cors(corsOptions),authUser);
app.use("/",cors(corsOptions),level);

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});