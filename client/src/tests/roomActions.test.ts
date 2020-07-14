import thunk, { ThunkMiddleware } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { socketMiddleware } from "../middlewares/socketMiddleware";
import * as RoomActions from "../actions/roomActions";
import * as UserActions from "../actions/userActions";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";
import { IAppState } from "../store/Store";

import express from "express";
import socketIo from "socket.io";
import { createServer, Server } from "http";
import { Room } from "../tests/mocks/mockServer/Room";

import { socketManagement } from "../tests/mocks/mockServer/Socket";

const middleware = [
  thunk as ThunkMiddleware<IAppState, RoomActions.RoomActions>,
  socketMiddleware(),
];

const mockStore = configureMockStore(middleware);

/*
 ********************* MOCK SERVER *********************
 */

let _app: express.Application;
let server: Server;
let port: number;
let io: SocketIO.Server;
let rooms: Room[];

function listen(): void {
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    socketManagement(io, rooms);
  });
}
port = 8080;
_app = express();
server = createServer(_app);
io = socketIo(server);
rooms = [];
listen();

const playerTest = {
  id: "1",
  userName: "1",
  roomId: "1",
  idPiece: 0,
  pieceKeep: {
    piece: "",
    canKeep: true,
  },
  linesToAdd: 0,
  gameOver: false,
  life: 5,
};

const roomTest = {
  room: {
    id: "1",
    inGame: false,
    players: [
      {
        id: "1",
        userName: "1",
        roomId: "1",
        idPiece: 0,
        pieceKeep: {
          piece: "",
          canKeep: true,
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5,
      },
    ],
    gameMaster: {
      id: "1",
      userName: "1",
      roomId: "1",
      idPiece: 0,
      pieceKeep: {
        piece: "",
        canKeep: true,
      },
      linesToAdd: 0,
      gameOver: false,
      life: 5,
    },
    isPrivate: true,
    spectrums: [
      {
        id: "1",
        spectrum: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        userName: "1",
      },
    ],
    tetriminosList: [
      "T",
      "L",
      "I",
      "O",
      "S",
      "J",
      "L",
      "I",
      "Z",
      "S",
      "O",
      "J",
      "L",
      "L",
      "I",
      "O",
      "J",
      "T",
      "L",
      "Z",
      "S",
      "I",
      "T",
      "L",
      "Z",
      "O",
      "L",
      "I",
      "S",
      "J",
      "Z",
      "T",
      "I",
      "O",
      "J",
      "L",
      "S",
      "I",
      "Z",
      "O",
      "T",
      "L",
      "J",
      "Z",
      "S",
      "T",
      "I",
      "O",
      "Z",
      "L",
    ],
  },
  error: "",
  gameSettings: {
    gameSpeed: "NORMAL",
    rotations: false,
    hardcore: "NONE",
  },
  gameSettingsDone: false,
};

const settings = {
  room: {
    id: "1",
    inGame: false,
    players: [
      {
        id: "1",
        userName: "1",
        roomId: "1",
        idPiece: 0,
        pieceKeep: {
          piece: "",
          canKeep: true,
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5,
      },
    ],
    gameMaster: {
      id: "1",
      userName: "1",
      roomId: "1",
      idPiece: 0,
      pieceKeep: {
        piece: "",
        canKeep: true,
      },
      linesToAdd: 0,
      gameOver: false,
      life: 5,
    },
    isPrivate: false,
    tetriminosList: [],
    spectrums: [],
  },
  gameSettings: {
    gameSpeed: GameSpeed.NORMAL,
    rotations: false,
    hardcore: GameHardcore.NONE,
  },
};

const mockState = {
  room: roomTest,
};

describe("Actions", () => {
  afterAll(() => {
    io.close();
  });

  it("Should create an action to JoiningRoom", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = [
      {
        type: RoomActions.RoomActionType.JOINING_ROOM,
        room: roomTest.room,
        error: roomTest.error,
        gameSettings: roomTest.gameSettings,
      },
    ];
    store.dispatch(UserActions.JoinRoom(playerTest));
    return store.dispatch<any>(RoomActions.JoiningRoom()).then(() => {
      store.getState = () => {
        const test1 = store.getActions();
        expectedResponse[0].room.tetriminosList = test1[0].room.tetriminosList;
      };
      store.getState();
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should create an action to GameSettingsDone", async () => {
    const store = mockStore({});
    const expectedResponse = [
      {
        type: RoomActions.RoomActionType.GAME_SETTINGS_DONE,
        gameSettingsDone: true,
      },
    ];
    return store.dispatch<any>(RoomActions.GameSettingsDone(true)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should create an action to RefreshRoom", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = [
      {
        type: RoomActions.RoomActionType.REFRESH_ROOM,
        room: roomTest.room,
        error: roomTest.error,
        gameSettings: roomTest.gameSettings,
      },
    ];
    expectedResponse[0].room.isPrivate = false;
    store.dispatch(RoomActions.RefreshGameSettings(settings));
    return store.dispatch<any>(RoomActions.RefreshRoom()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should create an action RefreshGameSettings", async () => {
    const expectedResponse = {
      type: RoomActions.RoomActionType.REFRESH_GAME_SETTINGS,
      event: RoomActions.RoomActionType.REFRESH_GAME_SETTINGS,
      emit: true,
      rest: settings,
    };
    expect(RoomActions.RefreshGameSettings(settings)).toEqual(expectedResponse);
  });

  it("Should create an action to SetRoomInGame", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = {
      type: RoomActions.RoomActionType.SET_ROOM_IN_GAME,
      event: RoomActions.RoomActionType.SET_ROOM_IN_GAME,
      emit: true,
      rest: roomTest.room,
    };
    expect(RoomActions.SetRoomInGame(roomTest.room)).toEqual(expectedResponse);
  });

  it("Should create an action to ResetRoomEmit", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = {
      type: RoomActions.RoomActionType.SET_ROOM_IN_GAME,
      event: RoomActions.RoomActionType.SET_ROOM_IN_GAME,
      emit: true,
      rest: roomTest.room,
    };
    expect(RoomActions.SetRoomInGame(roomTest.room)).toEqual(expectedResponse);
  });
});
