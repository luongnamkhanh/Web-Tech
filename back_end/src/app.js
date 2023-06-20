const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/router.js');


const app = express();

// Database connection
require('./DBconnection/conn.js');

/** middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;



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
    socket.on('join', roomCode => {
        console.log(`Room name is ${roomCode}`);
        socket.join(roomCode);
        console.log('Joined room');
    });
    socket.on('startGame', (roomCode) => {
        console.log(`${socket.id} send start game signal to room: ${roomCode}`);
        const randomSides = getRandomSide();
        socket.emit("startGame", randomSides[0]);
        socket.to(roomCode).emit("startGame", randomSides[1]);
    })
    socket.on('move', (roomCode, from, to) => {
        console.log('Sending moves');
        socket.to(roomCode).emit("opponentMove", from, to);
    })
})


function getRandomSide() {
    if (Math.floor(Math.random() * 2) == 0) {
        return ["black", "white"];
    } else {
        return ["white", "black"];
    }
}
