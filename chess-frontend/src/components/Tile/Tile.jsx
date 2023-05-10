import "./Tile.css";

function Tile({coordinate, piece}){
    const pieceMap = {
        "r" : "Rook_b",
        "n" : "Knight_b",
        "b" : "Bishop_b",
        "q" : "Queen_b",
        "k" : "King_b",
        "p" : "Pawn_b",
        "R" : "Rook_w",
        "N" : "Knight_w",
        "B" : "Bishop_w",
        "Q" : "Queen_w",
        "K" : "King_w",
        "P" : "Pawn_w",
        "none" : "none"
    }

    const img_path = `./Images/ChessPieces/${pieceMap[piece]}.png`;
    function selectTile(horizontalCoordinate, vertitalCoordinate){
        console.log(`Clicked on ${horizontalCoordinate}${vertitalCoordinate}`);
    }

    console.log(`${coordinate[0]}${coordinate[1]}: ${piece}`);

    if ((coordinate[0].charCodeAt(0) + coordinate[1].charCodeAt(0)) % 2 === 0)
        return <div className="tile black-tile" onClick={() => selectTile(coordinate[0], coordinate[1])}><img src={img_path}/></div>
    else
        return <div className="tile white-tile" onClick={() => selectTile(coordinate[0], coordinate[1])}><img src={img_path}/></div>

}

export default Tile;