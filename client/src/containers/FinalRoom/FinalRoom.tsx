/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { IAppState } from "../../store/Store";
import { IUser, Board } from "../../reducers/userReducers";
import {
  IRoom,
  IRoomSettings,
  IGameSettings,
  GameSpeed,
} from "../../reducers/roomReducer";
import * as roomAction from "../../actions/roomActions";
import * as userAction from "../../actions/userActions";
import RoomPage from "../RoomSettings/RoomSettings";
import GameSettings from "../GameSettings/GameSettings";
import GamePage, { useInterval } from "../GameBoard/GameBoard";
import { IBoardDataEmit } from "../../actions/userActions";

interface Props extends RouteComponentProps {
  user: IUser;
  room: IRoom;
  roomSettings: IRoomSettings;
  gameSettings: IGameSettings;
  refreshRoom: () => void;
  updateUser: () => void;
  leaveRoom: (user: IUser) => void;
  gameSettingsDone: boolean;
  board: Board;
  music: any;
  refreshGameSettings: ({
    room: IRoom,
    gameSettings: IGameSettings,
  }: roomAction.SettingsGameTypeNested) => void;
  refreshBoardEmit: (data: IBoardDataEmit) => void;
  updateGameSettingsDone: (done: boolean) => void;
  refreshBoardReducer: () => void;
  refreshMalusReducer: () => void;
  handleMusica: (music: any) => void;
}

const FinalRoomPage: React.FC<Props> = (props) => {
  // const url = "https://ia600504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3";
  // const [volume, setVolume] = useState({
  //   audio: new Audio(url),
  //   on: false
  // });
  const [counter, setCounter] = useState(10);
  const [speed, setSpeed] = useState(1000);

  const {
    refreshRoom,
    updateUser,
    leaveRoom,
    updateGameSettingsDone,
    refreshBoardReducer,
    refreshBoardEmit,
    refreshMalusReducer,
  } = props;
  if (!props.user.roomId) {
    props.history.push("/");
  }
  useEffect(() => {
    refreshRoom();
    refreshMalusReducer();
  }, [refreshRoom]);
  useEffect(() => {
    updateUser();
    refreshMalusReducer();
  }, [updateUser]);
  useEffect(() => {
    updateGameSettingsDone(false);
  }, [leaveRoom]);
  useEffect(() => {
    refreshMalusReducer();
    refreshBoardReducer();
  }, []);
  useInterval(
    () => {
      if (props.room.inGame && props.user.gameOver !== true) {
        refreshBoardEmit({
          user: props.user,
          room: props.room,
          board: props.board,
          move: "ArrowDown",
        });
        setCounter(counter - 1);
        if (counter <= 0) {
          setCounter(60);
          setSpeed(
            speed > 500 ? speed - 100 : speed > 400 ? speed - 10 : speed
          );
        }
      }
    },
    props.gameSettings.gameSpeed === GameSpeed.FAST ? speed : 1050
  );

  if (
    props.gameSettingsDone === false &&
    props.user.id === props.room.gameMaster.id
  ) {
    return <GameSettings />;
  } else if (props.room.inGame === false) {
    return <RoomPage />;
  } else {
    return (
      <GamePage
        music={props.music}
        handleMusica={props.handleMusica}
        leaveRoomHandler={leaveRoom}
        refreshRoom={props.refreshRoom}
        gameSettings={props.gameSettings}
        refreshBoardEmit={props.refreshBoardEmit}
        user={props.user}
        room={props.room}
        board={props.board}
      />
    );
  }
};

const mapStateToProps = (store: IAppState) => {
  return {
    user: store.userState.user,
    room: store.roomState.room,
    roomSettings: store.userState.roomSettings,
    gameSettings: store.roomState.gameSettings,
    gameSettingsDone: store.roomState.gameSettingsDone,
    board: store.userState.board,
    music: store.userState.music,
  };
};

const mapDispatchToProps = {
  refreshRoom: () => roomAction.RefreshRoom(),
  leaveRoom: (user: IUser) => userAction.LeaveRoom(user),
  updateUser: () => userAction.UpdateUser(),
  refreshGameSettings: ({
    room,
    gameSettings,
  }: roomAction.SettingsGameTypeNested) =>
    roomAction.RefreshGameSettings({ room, gameSettings }),
  updateGameSettingsDone: (done: boolean) => roomAction.GameSettingsDone(done),
  refreshBoardReducer: () => userAction.RefreshBoardReducer(),
  refreshBoardEmit: (data: userAction.IBoardDataEmit) =>
    userAction.RefreshBoardEmit(data),
  refreshMalusReducer: () => userAction.RefreshMalusReducer(),
  handleMusica: (music: any) => userAction.HandleMusica(music),
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalRoomPage);
