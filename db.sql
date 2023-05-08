CREATE TABLE player (
    player_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(200),
    status VARCHAR(20) DEFAULT 'offline'
);

CREATE TABLE ranking (
    player_id INT PRIMARY KEY REFERENCES player(player_id),
    score INT NOT NULL DEFAULT 0 check (score >=0 and score <=10),
    rank VARCHAR(20) DEFAULT NULL,
    win_match INT NOT NULL DEFAULT 0,
    lose_match INT NOT NULL DEFAULT 0,
    draw_match INT NOT NULL DEFAULT 0
);

CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    player1_id INT NOT NULL REFERENCES player(player_id),
    player2_id INT NOT NULL REFERENCES player(player_id),
    winner INT REFERENCES player(player_id),
    start_time TIMESTAMP DEFAULT NOW(),
    end_time TIMESTAMP
);

CREATE TABLE moves (
    move_id INT NOT NULL,
    match_id INT NOT NULL REFERENCES matches(match_id),
    player_id INT NOT NULL REFERENCES player(player_id),
    piece VARCHAR(10) NOT NULL,
    start_coordinate VARCHAR(2) NOT NULL,
    end_coordinate VARCHAR(2) NOT NULL,
	PRIMARY Key (move_id,match_id)
);
------------------------------------------------------------------------------------------------
INSERT INTO player (username, email, password, avatar, status)
VALUES 
('john_doe', 'john@example.com', 'pass123', 'default_avatar.png', 'online'),
('jane_doe', 'jane@example.com', 'abc456', 'default_avatar.png', 'offline'),
('peter_smith', 'peter@example.com', 'qwerty789', 'default_avatar.png', 'online'),
('susan_adams', 'susan@example.com', 'iloveyou', 'default_avatar.png', 'offline'),
('mark_johnson', 'mark@example.com', 'mypassword', 'default_avatar.png', 'online');


-- Insert data into ranking table
INSERT INTO ranking (player_id, score, rank, win_match, lose_match, draw_match)
VALUES
(1, 7, 'gold', 10, 2, 1),
(2, 3, 'bronze', 5, 7, 0),
(3, 5, 'silver', 8, 4, 2),
(4, 2, 'bronze', 2, 9, 1),
(5, 8, NULL, 12, 1, 0);


-- Insert data into matches table
INSERT INTO matches (player1_id, player2_id, winner, start_time, end_time)
VALUES
(1, 2, 1, '2022-05-01 14:30:00', '2022-05-01 14:50:00'),
(3, 4, 3, '2022-05-03 10:15:00', '2022-05-03 10:45:00'),
(1, 3, NULL, '2022-05-05 19:00:00', '2022-05-05 19:20:00'),
(2, 4, 4, '2022-05-06 08:45:00', '2022-05-06 09:15:00'),
(5, 1, NULL, '2022-05-08 16:20:00', '2022-05-08 16:45:00');


-- Insert data into moves table
INSERT INTO moves (move_id, match_id, player_id, piece, start_coordinate, end_coordinate)
VALUES
    (1, 1, 1, 'pawn', 'e2', 'e4'),
    (2, 1, 2, 'knight', 'g8', 'f6'),
    (3, 1, 1, 'pawn', 'd2', 'd4'),
    (4, 1, 2, 'bishop', 'f8', 'c5'),
    (5, 1, 1, 'knight', 'g1', 'f3'),
    (6, 1, 2, 'pawn', 'c7', 'c5'),
    (7, 1, 1, 'bishop', 'f1', 'd3'),
    (8, 1, 2, 'pawn', 'b7', 'b6'),
    (9, 1, 1, 'queen', 'd1', 'h5'),
    (10, 1, 2, 'knight', 'g8', 'f6'),
    (11, 1, 1, 'bishop', 'c1', 'g5'),
    (12, 1, 2, 'pawn', 'a7', 'a6'),
    (13, 1, 1, 'rook', 'h1', 'h3'),
    (14, 1, 2, 'knight', 'f6', 'd5'),
    (15, 1, 1, 'queen', 'h5', 'f7');
