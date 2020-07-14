import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { IRoom, IRoomState, IGameSettings } from "../reducers/roomReducer";

export enum RoomActionType {
  REFRESH_ROOM = "refresh_room",
  JOINING_ROOM = "joining_room",
  ROOM_JOINED = "room_joined",
  REFRESH_GAME_SETTINGS = "refresh_game_settings",
  GAME_SETTINGS_DONE = "game_settings_done",
  DEFAULT = "DEFAULT",
  SET_ROOM_IN_GAME = "set_room_in_game",
}

export interface JoiningRoomType {
  type: RoomActionType.JOINING_ROOM;
  room: IRoom;
  error: string;
  gameSettings: IGameSettings;
}

export interface GameSettingsDoneType {
  type: RoomActionType.GAME_SETTINGS_DONE;
  gameSettingsDone: boolean;
}

export interface JoiningRoomResType {
  room: IRoom;
  error: string;
  gameSettings?: IGameSettings;
}

export interface RefreshRoomActionType {
  type: RoomActionType.REFRESH_ROOM;
  room: IRoom;
  error: string;
  gameSettings: IGameSettings;
}

export interface SettingsGameTypeNested {
  room: IRoom;
  gameSettings: IGameSettings;
}

export interface RefreshSettingsType {
  type: RoomActionType.REFRESH_GAME_SETTINGS;
  gameSettings: IGameSettings;
}

export interface RoomActionDefaultType {
  type: RoomActionType.DEFAULT;
}

export type RoomActions =
  | JoiningRoomType
  | RefreshRoomActionType
  | GameSettingsDoneType
  | RoomActionDefaultType;

export const JoiningRoom: ActionCreator<ThunkAction<
  Promise<any>,
  IRoomState,
  null,
  JoiningRoomType
>> = () => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        event: RoomActionType.JOINING_ROOM,
        type: RoomActionType.JOINING_ROOM,
        handle: (data: JoiningRoomResType) => {
          resolve(
            dispatch({
              type: RoomActionType.JOINING_ROOM,
              room: data.room,
              error: data.error,
              gameSettings: data.gameSettings,
            })
          );
        },
      });
    });
  };
};

export const GameSettingsDone: ActionCreator<ThunkAction<
  Promise<any>,
  IRoomState,
  boolean,
  GameSettingsDoneType
>> = (done: boolean) => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      resolve(
        dispatch({
          type: RoomActionType.GAME_SETTINGS_DONE,
          gameSettingsDone: done,
        })
      );
    });
  };
};

export const RefreshRoom: ActionCreator<ThunkAction<
  Promise<any>,
  IRoomState,
  null,
  RefreshRoomActionType
>> = () => {
  return async (dispatch: Dispatch) => {
    return new Promise<any>((resolve) => {
      dispatch({
        event: RoomActionType.REFRESH_ROOM,
        type: RoomActionType.REFRESH_ROOM,
        handle: (data: JoiningRoomResType) => {
          resolve(
            dispatch({
              type: RoomActionType.REFRESH_ROOM,
              room: data.room,
              error: data.error,
              gameSettings: data.gameSettings,
            })
          );
        },
      });
    });
  };
};

export const RefreshGameSettings = (settings: SettingsGameTypeNested) => {
  return {
    type: RoomActionType.REFRESH_GAME_SETTINGS,
    event: RoomActionType.REFRESH_GAME_SETTINGS,
    emit: true,
    rest: settings,
  };
};

export const SetRoomInGame = (room: IRoom) => {
  return {
    type: RoomActionType.SET_ROOM_IN_GAME,
    event: RoomActionType.SET_ROOM_IN_GAME,
    emit: true,
    rest: room,
  };
};

export const ResetRoomEmit = (room: IRoom) => {
  return {
    type: RoomActionType.SET_ROOM_IN_GAME,
    event: RoomActionType.SET_ROOM_IN_GAME,
    emit: true,
    rest: room,
  };
};
// this test is the same of the SetRoomInGame why
