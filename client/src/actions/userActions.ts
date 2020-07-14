import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { IRoomSettings, IRoom } from "../reducers/roomReducer";
import { IUser, IUserState, Board } from "../reducers/userReducers";

export enum UserActionType {
  JOIN_ROOM = "join_room",
  CREATE_USER = "create_user",
  UPDATE_USER = "update_user",
  LEAVE_ROOM = "leave_room",
  REFRESH_ROOM_SETTINGS = "refresh_room_settings",
  DEFAULT = "DEFAULT",
  BOARD = "board",
  INITIALIZE_GAME = "initialize_game",
  MALUS = "malus",
  MUSIC = "music",
}

export interface CreateUserActionType {
  type: UserActionType.CREATE_USER;
  user: IUser;
}

export interface UpdateUserStateActionType {
  type: UserActionType.UPDATE_USER;
  user: IUser;
}

export interface UserJoinRoomActionType {
  type: UserActionType.JOIN_ROOM;
  user: IUser;
}

export interface UpdateUserActionType {
  type: UserActionType.UPDATE_USER;
  user: IUser;
}

export interface SettingsRoomTypeNested {
  roomSettings: IRoomSettings;
}

export interface RefreshRoomSettingsType {
  type: UserActionType.REFRESH_ROOM_SETTINGS;
  roomSettings: IRoomSettings;
}

export interface RefreshMalusActionType {
  type: UserActionType.MALUS;
  linestoAdd: number;
}

export interface UserActionDefaultType {
  type: UserActionType.DEFAULT;
}

export interface IBoardData {
  user: IUser;
  board: Board;
}

export interface IBoardDataEmit {
  user: IUser;
  room: IRoom;
  board: Board;
  move: string;
}
export interface RefreshBoardActionType {
  type: UserActionType.BOARD;
  board: Board;
}

export interface InitializeGameEmitType {
  type: UserActionType.INITIALIZE_GAME;
  user: IUser;
  board: Board;
}

interface MusicActionType {
  type: UserActionType.MUSIC;
  music: any;
}

export type UserActions =
  | CreateUserActionType
  | UpdateUserStateActionType
  | RefreshRoomSettingsType
  | UserActionDefaultType
  | RefreshBoardActionType
  | RefreshMalusActionType
  | MusicActionType;

export const CreateUser: ActionCreator<ThunkAction<
  Promise<any>,
  IUserState,
  null,
  CreateUserActionType
>> = () => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        event: UserActionType.CREATE_USER,
        type: UserActionType.CREATE_USER,
        handle: (id: string) => {
          resolve(
            dispatch({
              type: UserActionType.CREATE_USER,
              user: {
                id,
                userName: "",
                roomId: "",
                idPiece: 0,
                pieceKeep: {
                  piece: "",
                  canKeep: true,
                },
                linesToAdd: 0,
                gameOver: false,
                life: 5,
              },
            })
          );
        },
      });
    });
  };
};

export const JoinRoom = (user: IUser) => {
  return {
    event: UserActionType.JOIN_ROOM,
    type: UserActionType.JOIN_ROOM,
    emit: true,
    rest: user,
  };
};

export const UpdateUser: ActionCreator<ThunkAction<
  Promise<any>,
  IUserState,
  null,
  UserActions
>> = () => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        event: UserActionType.UPDATE_USER,
        type: UserActionType.UPDATE_USER,
        handle: (user: IUser) => {
          resolve(
            dispatch({
              type: UserActionType.UPDATE_USER,
              user,
            })
          );
        },
      });
    });
  };
};

export const LeaveRoom = (user: IUser) => {
  return {
    event: UserActionType.LEAVE_ROOM,
    type: UserActionType.LEAVE_ROOM,
    emit: true,
    rest: user,
  };
};

export const RefreshRoomSettings: ActionCreator<ThunkAction<
  Promise<any>,
  IUserState,
  SettingsRoomTypeNested,
  RefreshRoomSettingsType
>> = (settings: IRoomSettings) => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      resolve(
        dispatch({
          type: UserActionType.REFRESH_ROOM_SETTINGS,
          roomSettings: settings,
        })
      );
    });
  };
};

export const InitializeGameEmit = (refreshBoardData: IBoardDataEmit) => {
  return {
    event: UserActionType.INITIALIZE_GAME,
    type: UserActionType.INITIALIZE_GAME,
    emit: true,
    rest: refreshBoardData,
  };
};

export const RefreshBoardEmit = (refreshBoardData: IBoardDataEmit) => {
  return {
    event: UserActionType.BOARD,
    type: UserActionType.BOARD,
    emit: true,
    rest: refreshBoardData,
  };
};

export const RefreshBoardReducer: ActionCreator<ThunkAction<
  Promise<any>,
  IUserState,
  null,
  RefreshRoomSettingsType
>> = () => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        event: UserActionType.BOARD,
        type: UserActionType.BOARD,
        handle: (data: IBoardData) => {
          resolve(
            dispatch({
              type: UserActionType.BOARD,
              board: data.board,
            })
          );
        },
      });
    });
  };
};

export const RefreshMalusReducer: ActionCreator<ThunkAction<
  Promise<any>,
  IUserState,
  null,
  RefreshMalusActionType
>> = () => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        event: UserActionType.MALUS,
        type: UserActionType.MALUS,
        handle: (data: RefreshMalusActionType) => {
          console.log("linesToAdd", data);
          resolve(
            dispatch({
              type: UserActionType.MALUS,
              linesToAdd: data.linestoAdd,
            })
          );
        },
      });
    });
  };
};

export const HandleMusica = (music: any): MusicActionType => {
  console.log("Music action creator");
  return {
    type: UserActionType.MUSIC,
    music,
  };
};
