const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();

// Add this near the top of your file, after creating your Express app
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '425222',
  port: 5432,
});

app.get('/api/highscores', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT player.username, ranking.rank, ranking.score 
      FROM player 
      INNER JOIN ranking ON player.player_id = ranking.player_id 
      ORDER BY ranking.score DESC 
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred, please try again' });
  }
});

const port = 3001
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
  socket.on('join', roomCode =>{
    console.log(`Room name is ${roomCode}`);
    socket.join(roomCode);
    console.log('Joined room');
  });
  socket.on('startGame', (roomCode) =>{
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
  if (Math.floor(Math.random() * 2) == 0){
    return ["black", "white"];
  }else{
    return ["white", "black"];
  }
}




