import React from "react";
import { connect } from "react-redux";
import { Button, Grid } from "semantic-ui-react";

import { IAppState } from "../../store/Store";
import { IUser, Board } from "../../reducers/userReducers";
import { IRoom, IRoomSettings } from "../../reducers/roomReducer";
import * as userAction from "../../actions/userActions";
import * as roomAction from "../../actions/roomActions";
import CharacterList from "../../components/RoomSettings/UsersList";
import Tetrominos from "../img/tetrominos.png";
import { IBoardDataEmit } from "../../actions/userActions";

interface Props {
  user: IUser;
  room: IRoom;
  roomSettings: IRoomSettings;
  board: Board;
  leaveRoom: (user: IUser) => void;
  setRoomInGame: (room: IRoom) => void;
  refreshBoardEmit: (data: IBoardDataEmit) => void;
}

const RoomPage: React.FC<Props> = (props) => {
  const { room, leaveRoom, user, board } = props;

  const submitted = (e: React.MouseEvent) => {
    e.preventDefault();
    props.room.inGame = true;
    props.setRoomInGame(props.room);
    props.refreshBoardEmit({ user, room, board, move: "" });
  };

  return (
    <div>
      <img
        src={Tetrominos}
        className="Tetrominos"
        alt="Logo"
        style={{ alignItems: "center" }}
      />
      <h2 style={{ color: "#31E981" }}>Welcome to room {room.id}</h2>
      <Grid centered>
        <Grid.Column width={7}>
          <CharacterList
            room={props.room}
            me={props.user}
            leaveRoomHandler={leaveRoom}
          />
        </Grid.Column>
      </Grid>
      <br />
      <Button onClick={submitted} name="setInGame">
        Let's Play
      </Button>
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    user: store.userState.user,
    roomSettings: store.userState.roomSettings,
    room: store.roomState.room,
    board: store.userState.board,
  };
};

const mapDispatchToProps = {
  leaveRoom: (user: IUser) => userAction.LeaveRoom(user),
  setRoomInGame: (room: IRoom) => roomAction.SetRoomInGame(room),
  refreshBoardEmit: (data: userAction.IBoardDataEmit) =>
    userAction.RefreshBoardEmit(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
