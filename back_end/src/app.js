const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/router.js');
const socketGameLogic = require('./SocketGameLogic.js')
const session = require('express-session');


const app = express();

// Database connection
require('./DBconnection/conn.js');

/** middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.use(
    session({
        secret: '123456',
        resave: false,
        saveUninitialized: false,
    })
);
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

let playerList = [];
console.log(playerList);

/** api routes */
app.use('/api', router)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
    },
})

io.on('connect', socket => {
    console.log(socket.id);
    socketGameLogic.initializeGame(io, socket, playerList);
})



