/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router";
import { useToasts } from "react-toast-notifications";

import { IAppState } from "../../store/Store";
import { IUser } from "../../reducers/userReducers";
import { IRoom } from "../../reducers/roomReducer";
import * as userAction from "../../actions/userActions";
import * as roomAction from "../../actions/roomActions";
import FormHomePage from "../../components/Home/FormHome";
import Redtetris_logo from "../img/redTetris_logo.png";

interface Props extends RouteComponentProps {
  user: IUser;
  room: IRoom;
  joinRoomError: string;
  getUser: () => void;
  emitJoinRoom: (user: IUser) => void;
  roomInfoJoining: () => void;
}

const HomePage: React.FC<Props> = (props) => {
  const { addToast } = useToasts();
  const { joinRoomError, getUser, emitJoinRoom, roomInfoJoining } = props;
  const [state, setState] = useState({
    redirect: false,
  });
  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    roomInfoJoining();
  }, [roomInfoJoining]);

  useEffect(() => {
    error_toastr(joinRoomError);
  }, [props.user.roomId]);

  const error_toastr = (error: string): void => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (props.user.roomId && props.user.userName && !joinRoomError) {
      addToast("Setup your game now", {
        appearance: "success",
        autoDismiss: true,
      });
      setState({ redirect: true });
    }
  };

  if (
    !joinRoomError &&
    props.user.roomId &&
    props.user.userName &&
    props.room &&
    props.room.id &&
    state.redirect === true
  ) {
    return <Redirect to={`/${props.room.id}[${props.user.userName}]`} />;
  }

  return (
    <div>
      <div>
        <img
          src={Redtetris_logo}
          style={{ height: "15vmin", margin: "10px" }}
          alt="logo"
        />
      </div>
      <FormHomePage user={props.user} emitJoinRoom={emitJoinRoom} />
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    user: store.userState.user,
    room: store.roomState.room,
    joinRoomError: store.roomState.error,
  };
};

const mapDispatchToProps = {
  getUser: () => userAction.CreateUser(),
  emitJoinRoom: (user: IUser) => userAction.JoinRoom(user),
  roomInfoJoining: () => roomAction.JoiningRoom(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
