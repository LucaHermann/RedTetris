import { Reducer } from "redux";

import { RoomActionType, RoomActions } from "../actions/roomActions";
import { IUser } from "./userReducers";

export interface ISpectrums {
  id: string;
  userName: string;
  score?: number;
  spectrum: number[][];
}

export interface IRoom {
  id: string;
  inGame: boolean;
  players: IUser[];
  gameMaster: IUser;
  isPrivate: boolean;
  tetriminosList: any;
  spectrums: ISpectrums[];
}

export interface IRoomState {
  readonly room: IRoom;
  readonly error: string;
  readonly gameSettings?: IGameSettings;
  readonly gameSettingsDone: boolean;
  // peut etre le mettre ici l erreur ou dans le state de l user parce que c est pas pour toute
  // la room mais seulement pour un user. A voir en rentrant et la deuxieme action du reducer en filant
  // plus entierement une room mais juste une erreur a afficher dans un layout avec une modale
}

export interface IRoomSettings {
  setEffect: boolean;
  setSpectrum: boolean;
}

export interface IGameSettings {
  gameSpeed: GameSpeed;
  rotations: boolean;
  hardcore: GameHardcore;
}

export enum GameSpeed {
  NORMAL = "NORMAL",
  FAST = "Fast"
}

export enum GameHardcore {
  ONE_LINE_ONE_DIE = "ONE_LINE_ONE_DIE",
  ONE_LINE_FIVE_LIVES = "ONE_LINE_FIVE_LIVES",
  NONE = "NONE"
}

const initialRoomState: IRoomState = {
  room: {
    id: "",
    inGame: false,
    players: [],
    gameMaster: {
      id: "",
      userName: "",
      roomId: "",
      idPiece: 0,
      score: 0,
      lines: 0,
      pieceKeep: {
        piece: "",
        canKeep: true
      },
      linesToAdd: 0,
      gameOver: false,
      life: 5
    },
    isPrivate: false,
    tetriminosList: [],
    spectrums: []
  },
  error: "",
  gameSettings: {
    gameSpeed: GameSpeed.NORMAL,
    rotations: false,
    hardcore: GameHardcore.NONE
  },
  gameSettingsDone: false
};

export const roomReducer: Reducer<IRoomState, RoomActions> = (state = initialRoomState, action) => {
  switch (action.type) {
    case RoomActionType.JOINING_ROOM:
      return {
        ...state,
        room: action.room,
        error: action.error,
        gameSettings: action.gameSettings
      };
    case RoomActionType.REFRESH_ROOM:
      return {
        ...state,
        room: action.room,
        error: action.error,
        gameSettings: action.gameSettings
      };
    case RoomActionType.GAME_SETTINGS_DONE:
      return {
        ...state,
        gameSettingsDone: action.gameSettingsDone
      };
    default:
      return state;
  }
};
