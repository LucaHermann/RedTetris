import React from "react";

import "./GameInfoPieces.css";
import { IRoom } from "src/reducers/roomReducer";
import { IUser } from "src/reducers/userReducers";
import NextPieceGrid from "./NextPieceGrid";

interface IProps {
  room: IRoom;
  user: IUser;
}

export const piecesShape = (tetrimino: string): number[][] => {
  switch (tetrimino) {
    case "I":
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    case "J":
      return [
        [2, 0, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "L":
      return [
        [0, 0, 3, 0],
        [3, 3, 3, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "O":
      return [
        [4, 4, 0, 0],
        [4, 4, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "S":
      return [
        [0, 5, 5, 0],
        [5, 5, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "T":
      return [
        [0, 6, 0, 0],
        [6, 6, 6, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    case "Z":
      return [
        [7, 7, 0, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    default:
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
  }
};

const GameInfoPieces: React.SFC<IProps> = (props) => {
  return (
    <div>
      <div className="NextPiecesContainer">
        <p style={{ fontSize: "0.4em", color: "#31E981" }}>Next</p>
        <div className="NextPiece">
          <NextPieceGrid
            spectrum={piecesShape(
              props.room.tetriminosList[props.user.idPiece! + 1]
            )}
          />
        </div>
        <div className="NextPiece">
          <NextPieceGrid
            spectrum={piecesShape(
              props.room.tetriminosList[props.user.idPiece! + 2]
            )}
          />
        </div>
        <div className="NextPiece">
          <NextPieceGrid
            spectrum={piecesShape(
              props.room.tetriminosList[props.user.idPiece! + 3]
            )}
          />
        </div>
      </div>
      <div className="HoldPieceContainer">
        <p style={{ fontSize: "0.4em", color: "#31E981" }}>Hold</p>
        <div className="HoldPiece">
          <NextPieceGrid
            spectrum={piecesShape(
              props.user.pieceKeep ? props.user.pieceKeep.piece : ""
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GameInfoPieces;
