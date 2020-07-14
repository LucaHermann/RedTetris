import { Reducer } from "redux";

import { UserActions, UserActionType } from "../actions/userActions";
import { IRoomSettings } from "./roomReducer";

export interface IKeepPiece {
  piece: string;
  canKeep: boolean;
}

export interface IUser {
  id: string;
  userName?: string;
  roomId?: string;
  idPiece?: number;
  score?: number;
  lines?: number;
  pieceKeep: IKeepPiece;
  linesToAdd: number;
  gameOver: boolean;
  life: number;
}

export interface IPos {
  x: number;
  y: number;
}

export interface Piece {
  shape: number[][];
  color: string;
  width: number;
  height: number;
  pos: IPos;
  tetrimino: string;
  shapeState: number;
}

export interface Board {
  grid: number[][];
  tmpGrid: number[][];
  currentPiece: Piece;
}

export interface IUserState {
  readonly user: IUser;
  readonly roomSettings?: IRoomSettings;
  readonly board: Board;
  readonly music: any;
}

const initialUserState: IUserState = {
  user: {
    id: "",
    userName: "",
    roomId: "",
    idPiece: 0,
    score: 0,
    lines: 0,
    pieceKeep: {
      piece: "",
      canKeep: true,
    },
    linesToAdd: 0,
    gameOver: false,
    life: 5,
  },
  music: {
    on: false,
    audio: new Audio(
      "http://f3.quomodo.com/20418264/uploads/686/bandas%20-%20Pena%20Baiona%20(Vino%20griego%20version%20Aviron%20Bayonnais).mp3"
    ),
  },
  roomSettings: {
    setEffect: false,
    setSpectrum: false,
  },
  board: {
    grid: Array.from({ length: 20 }, () => Array(10).fill(0)),
    tmpGrid: Array.from({ length: 20 }, () => Array(10).fill(0)),
    currentPiece: {
      shape: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      color: "",
      width: 0,
      height: 0,
      pos: { x: 0, y: 0 },
      tetrimino: "",
      shapeState: 0,
    },
  },
};

export const userReducer: Reducer<IUserState, UserActions> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case UserActionType.CREATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case UserActionType.UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case UserActionType.REFRESH_ROOM_SETTINGS:
      return {
        ...state,
        roomSettings: action.roomSettings,
      };
    case UserActionType.BOARD:
      return {
        ...state,
        board: action.board,
      };
    case UserActionType.MALUS:
      return {
        ...state,
        user: { ...state.user, linesToAdd: action.linestoAdd },
      };
    case UserActionType.MUSIC:
      return {
        ...state,
        music: action.music,
      };
    default:
      return state;
  }
};
