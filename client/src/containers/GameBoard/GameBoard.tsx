import React, { useEffect, useRef } from "react";
import { Button } from "semantic-ui-react";

import "./GameBoard.css";
import { IUser, Board } from "../../reducers/userReducers";
import { IRoom, IGameSettings } from "../../reducers/roomReducer";
import { IBoardDataEmit } from "../../actions/userActions";
import GameGrid from "../../components/GameBoard/GameGrid";
import GameInfoScore from "../../components/GameBoard/GameInfoScore";
import GameSpectrum from "../../components/GameBoard/GameSpectrum";
import GameInfoPieces from "../../components/GameBoard/GameInfoPieces";
import ModalModalExample from "../../components/Modal/Modal";
import MusicButton from "../../components/Music/MusicHandler";

interface Props {
  user: IUser;
  room: IRoom;
  board: Board;
  refreshBoardEmit: (data: IBoardDataEmit) => void;
  gameSettings: IGameSettings;
  refreshRoom: any;
  leaveRoomHandler: any;
  handleMusica: (music: any) => void;
  music: any;
}

export const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => savedCallback.current(...args);
    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
    return;
  }, [delay]);
};

const GamePage: React.FC<Props> = (props) => {
  const leaveRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.leaveRoomHandler(props.user);
  };
  const gameContainer = useRef<any>(null);

  const { user, room } = props;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      (e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === " " ||
        e.key === "q" ||
        (e.key === "ArrowUp" && props.gameSettings.rotations === true)) &&
      props.user.gameOver !== true
    ) {
      props.refreshBoardEmit({
        user: props.user,
        room: props.room,
        board: props.board,
        move: e.key,
      });
    }
    return;
  };

  useEffect(() => {
    gameContainer.current.focus();
  }, []);

  return (
    <div
      className="GameContainer"
      tabIndex={0}
      ref={gameContainer}
      onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e)}
    >
      <ModalModalExample
        leaveRoomHandler={props.leaveRoomHandler}
        user={props.user}
        room={props.room}
      />
      <MusicButton music={props.music} musicOn={props.handleMusica} />
      <div className="GameBoard">
        <GameInfoPieces room={props.room} user={props.user} />
        <GameGrid board={props.board} />
        <div className="GameInfoScore">
          <GameInfoScore gameSettings={props.gameSettings} user={props.user} />
          <Button onClick={leaveRoom}>Quit</Button>
          <GameSpectrum room={room} user={user} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
