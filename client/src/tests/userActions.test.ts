import thunk, { ThunkMiddleware } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { socketMiddleware } from "../middlewares/socketMiddleware";
import * as actions from "../actions/userActions";
import { IAppState } from "../store/Store";
import { Room } from "../tests/mocks/mockServer/Room";

import express from "express";
import socketIo from "socket.io";
import { createServer, Server } from "http";
import { socketManagement } from "../tests/mocks/mockServer/Socket";

const middlewares = [
  thunk as ThunkMiddleware<IAppState, actions.UserActions>,
  socketMiddleware(),
];
const mockStore = configureMockStore(middlewares);

const playerTest = {
  id: "PlayerTestId",
  userName: "playerTest",
  roomId: "rooms234523sfdTaest",
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
    tetriminosList: [],
    spectrums: [],
  },
  error: "",
};

const boardTest = {
  board: {
    grid: Array.from({ length: 20 }, () => Array(10).fill(0)),
    tmpGrid: Array.from({ length: 20 }, () => Array(10).fill(0)),
    currentPiece: {
      tetrimino: "I",
      shape: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      color: "blue",
      width: 3,
      height: 3,
      pos: {
        x: -1,
        y: 1,
      },
      shapeState: 0,
    },
  },
};

const roomSettings = {
  setMusic: false,
  setEffect: false,
  setSpectrum: false,
};

const mockState = {
  user: playerTest,
  room: roomTest,
  board: boardTest,
  roomSettings,
};

const refreshBoardEmit = {
  user: playerTest,
  room: roomTest.room,
  board: boardTest.board,
  move: "",
};

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

describe("Actions", () => {
  afterAll(() => {
    io.close();
  });

  afterAll(() => {
    io.close();
  });

  it("Should create an action to CREATE_USER", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = [
      {
        type: actions.UserActionType.CREATE_USER,
        user: {
          id: "",
          roomId: "",
          userName: "",
          idPiece: 0,
          pieceKeep: {
            piece: "",
            canKeep: true,
          },
          linesToAdd: 0,
          gameOver: false,
          life: 5,
        },
      },
    ];
    return store.dispatch<any>(actions.CreateUser()).then(() => {
      store.getState = () => {
        const test1 = store.getActions();
        expectedResponse[0].user.id = test1[0].user.id;
        playerTest.id = test1[0].user.id;
      };
      store.getState();
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should create and action to JOIN_ROOM", async () => {
    const expectedResponse = {
      type: actions.UserActionType.JOIN_ROOM,
      event: actions.UserActionType.JOIN_ROOM,
      emit: true,
      rest: playerTest,
    };
    expect(actions.JoinRoom(playerTest)).toEqual(expectedResponse);
  });

  it("Should create an action to UPDATE_USER", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = [
      {
        type: actions.UserActionType.UPDATE_USER,
        user: playerTest,
      },
    ];
    store.dispatch(actions.JoinRoom(playerTest));
    return store.dispatch<any>(actions.UpdateUser()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should create an action to LEAVE_ROOM", async () => {
    const expectedResponse = {
      type: actions.UserActionType.LEAVE_ROOM,
      event: actions.UserActionType.LEAVE_ROOM,
      emit: true,
      rest: playerTest,
    };
    expect(actions.LeaveRoom(playerTest)).toEqual(expectedResponse);
  });

  it("Should create an action to REFRESH_ROOM_SETTINGS", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = [
      {
        type: actions.UserActionType.REFRESH_ROOM_SETTINGS,
        roomSettings,
      },
    ];
    return store
      .dispatch<any>(actions.RefreshRoomSettings(roomSettings))
      .then(() => {
        expect(store.getActions()).toEqual(expectedResponse);
      });
  });

  it("Should create an action to REFRESH_BOARD_EMIT", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = {
      event: actions.UserActionType.BOARD,
      type: actions.UserActionType.BOARD,
      emit: true,
      rest: refreshBoardEmit,
    };
    expect(actions.RefreshBoardEmit(refreshBoardEmit)).toEqual(
      expectedResponse
    );
  });

  it("Should create an action to INITIALIZE_GAME_EMIT", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = {
      event: actions.UserActionType.INITIALIZE_GAME,
      type: actions.UserActionType.INITIALIZE_GAME,
      emit: true,
      rest: refreshBoardEmit,
    };
    expect(actions.InitializeGameEmit(refreshBoardEmit)).toEqual(
      expectedResponse
    );
  });

  // it("Should create an action to REFRESH_BOARD_REDUCER", async () => {
  //   const store = mockStore({});
  //   store.getState = () => mockState;
  //   const expectedResponse = {
  //     type: actions.UserActionType.BOARD,
  //     board: boardTest,
  //   };
  //   return store
  //     .dispatch<any>(actions.RefreshBoardReducer(boardTest))
  //     .then(() => expect(store.getActions()).toEqual(expectedResponse));
  // });

  // it("Should create an action to REFRESH_MALUS_REDUCER", async () => {
  //   const store = mockStore({});
  //   store.getState = () => mockState;
  //   const expectedResponse = {
  //     type: actions.UserActionType.MALUS,
  //     linesToAdd: playerTest,
  //   };
  //   return store
  //     .dispatch<any>(actions.RefreshMalusReducer(playerTest))
  //     .then(() => expect(store.getActions()).toEqual(expectedResponse));
  // });

  it("Should create an action to MUSIC", async () => {
    const store = mockStore({});
    store.getState = () => mockState;
    const expectedResponse = {
      type: actions.UserActionType.MUSIC,
      music: "",
    };
    expect(actions.HandleMusica("")).toEqual(expectedResponse);
  });
});
