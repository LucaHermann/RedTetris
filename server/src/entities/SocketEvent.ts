export enum SocketEvent {
  CONNECT = "connect",
  CREATE_USER = "create_user",
  JOINING_ROOM = "joining_room",
  JOIN_ROOM = "join_room",
  REFRESH_ROOM = "refresh_room",
  DISCONNECT = "disconnect",
  LEAVE_ROOM = "leave_room",
  UPDATE_USER = "update_user",
  ROOM_JOINED = "room_joined",
  MESSAGE = "message",
  REFRESH_GAME_SETTINGS = "refresh_game_settings",
  SET_ROOM_IN_GAME = "set_room_in_game",
  BOARD = "board",
  INITIALIZE_GAME = "initialize_game",
  MOVE = "move",
  MALUS = "malus"
}

export interface IKeepPiece {
  piece: string;
  canKeep: boolean;
}

export interface IUser {
  id: string;
  userName: string;
  roomId: string;
  idPiece: number;
  score: number;
  lines: number;
  pieceKeep: IKeepPiece;
  linesToAdd: number;
  gameOver: boolean;
  life: number;
}

export interface ISpectrums {
  id: string;
  userName: string;
  score: number;
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
  // error: string;
}

export enum GameSpeed {
  NORMAL = "NORMAL",
  FAST = "FAST",
}

export enum GameHardcore {
  ONE_LINE_ONE_DIE = "ONE_LINE_ONE_DIE",
  ONE_LINE_FIVE_LIVES = "ONE_LIVE_FIVE_LIVES",
  NONE = "NONE",
}

export interface IRoomSettings {
  setMusic: boolean;
  setEffect: boolean;
  setSpectrum: boolean;
}

export interface IGameSettings {
  gameSpeed: GameSpeed;
  rotations: boolean;
  hardcore: GameHardcore;
}

export const wallKickDataButI =
  [
    [
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ],
    [
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    [
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    [
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
  ];


export const wallKickDataI =
  [
    [
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2]
    ],
    [
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1]
    ],
    [
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2]
    ],
    [
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1]
    ]
  ];

export interface IScore {
  points: number;
  lines: number;
}
