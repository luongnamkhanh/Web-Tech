const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://user_nmh:mongo_nmh@mydb.kduexaz.mongodb.net/chess?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });