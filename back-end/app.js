const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const postsRoute = require('./routes/posts')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// old method
// app.use(bodyParser.json());
// new method, dont need body parser anymore
app.use(express.urlencoded({extended : true}));
app.use(express.json())

// import routes like middleware
app.use("/posts", postsRoute)

// routes
app.get('/', (req, res) => {
    res.send("We are the world")
})


// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    () => console.log("connected !")
)

// listerner
app.listen(3000);
