import React from "react";
import { IUser } from "../../reducers/userReducers";
import { IGameSettings, GameHardcore } from "../../reducers/roomReducer";

interface IProps {
  gameSettings: IGameSettings;
  user: IUser;
}

const GameInfoScore: React.FC<IProps> = (props) => {
  // rajouter les props pour afficher dynamiquement les variables de scores, etc....
  return (
    <div
      className="GameInfoScoreContainer"
      id="right-column"
      style={{ display: "flex", flexDirection: "column", margin: "5px" }}
    >
      <p style={{ color: "#31E981", fontSize: "16.6667px" }}>RedTetris</p>
      <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
        Score: {props.user.score}
      </p>
      <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
        Lines: {props.user.lines}
      </p>
      {props.gameSettings &&
        props.gameSettings.hardcore !== GameHardcore.NONE && (
          <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
            Lines: {props.user.life}
          </p>
        )}
      <div id="right-column-controls">
        <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
          (q) for hold piece
        </p>
        <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
          (up) for rotate clockwise
        </p>
        <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
          (left) for move left
        </p>
        <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
          (right) for move right
        </p>
        <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
          (down) for speed up fall
        </p>
        <p style={{ color: "#31E981", fontSize: "10.6667px" }}>
          (space) for auto drop
        </p>
      </div>
    </div>
  );
};

export default GameInfoScore;
