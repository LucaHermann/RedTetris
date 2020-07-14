import React from "react";
import { connect } from "react-redux";
import { Grid, Button } from "semantic-ui-react";

import "./GameSettings.css";
import { IAppState } from "../../store/Store";
import { IRoom, IGameSettings } from "../../reducers/roomReducer";
import { IUser } from "../../reducers/userReducers";
import * as RoomAction from "../../actions/roomActions";
import GameModeCheckBox from "../../components/GameSettings/GameModeCheckBox";
import ModeCheckBox from "../../components/GameSettings/ModeCheckBox";
import Tetrominos from "../img/tetrominos.png";

interface IProps {
  user: IUser;
  room: IRoom;
  roomError: string;
  gameSettings: IGameSettings;
  refreshGameSettings: ({
    room: IRoom,
    gameSettings: IGameSettings,
  }: RoomAction.SettingsGameTypeNested) => void;
  gameSettingsDone: (done: boolean) => void;
}

const GameSettings: React.FC<IProps> = (props) => {
  const { refreshGameSettings } = props;

  const submitted = (e: React.MouseEvent) => {
    e.preventDefault();
    props.gameSettingsDone(true);
  };

  return (
    <div>
      <h1 style={{ color: "#31E981", margin: "40px", textAlign: "center" }}>
        Prepare Your Setup
      </h1>
      <img
        src={Tetrominos}
        className="Tetrominos"
        alt="Logo"
        style={{ justifyContent: "center", margin: "20px" }}
      />
      <Grid textAlign="center">
        <Grid.Row>
          <ModeCheckBox
            room={props.room}
            callBackHandler={refreshGameSettings}
            gameSettings={props.gameSettings}
          />
        </Grid.Row>
        <Grid.Row>
          <GameModeCheckBox
            room={props.room}
            gameSettings={props.gameSettings}
            refreshGameSettings={refreshGameSettings}
          />
        </Grid.Row>
        <br />
        <Button onClick={submitted} name="gameSettingsDone">
          Let's Play
        </Button>
      </Grid>
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    room: store.roomState.room,
    user: store.userState.user,
    roomError: store.roomState.error,
    gameSettings: store.roomState.gameSettings,
  };
};

const mapDispatchToProps = {
  refreshGameSettings: ({
    room,
    gameSettings,
  }: RoomAction.SettingsGameTypeNested) =>
    RoomAction.RefreshGameSettings({ room, gameSettings }),
  gameSettingsDone: (done: boolean) => RoomAction.GameSettingsDone(done),
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
