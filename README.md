# Web-Tech chess game website
The proposal is to build a web game to play chess, which follows international rules such as casting and a time limit for each move. The game will have a high score chart to honor the best players, with corresponding bronze, silver, and gold ranks. The system will not allow matches between players with a rank difference greater than one.

After a match is completed, the winner will receive 1 point and the loser will receive -1 point. To advance to a higher rank, a player must accumulate 10 points at their current rank and enter a promotion series. To be promoted, the player must win 3 out of 5 matches. If the player loses the promotion series, their accumulated points will decrease to 5 and the player has to gain the score again to get a higher rank.

Players can sign up and log in to the game and then send challenge invitations to online opponents. The other player can choose to accept or decline the challenge. If accepted, the match will take place, and the winner will be awarded 1 point while the loser will have 1 point deducted from their score. The player uses the mouse to interact with the chess pieces, and there is a time limit for each turn.

The system will use a PostgreSQL database to handle player information, game information, and rankings. The system will be built with Node.js for the backend, Socket.io for real-time communication between players, and React for the frontend. In the future, the system will have features such as handling multiple matches at the same time, a chat system, finding random matches, and a training room to practice against an AI bot. 
## Technology Stack
* **Frontend:** []
* **Backend:** []
* **Database:** [PostgreSQL]

## Requirements
* [Visual Studio Code](https://code.visualstudio.com/)
* [PgAdmin](https://www.pgadmin.org/download/)

## Website Preview
### Player Portal Preview
[!Demo]

## Project Structure

## Entity Relationship Diagram

## Schema
