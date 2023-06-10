const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const moveRoutes = require('./routes/moveRoutes');

const app = express()
const PORT = process.env.PORT || 3000
const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to database & Server beating 💓 on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/users', userRoutes);
app.use('/matches', matchRoutes);
app.use('/moves', moveRoutes);
