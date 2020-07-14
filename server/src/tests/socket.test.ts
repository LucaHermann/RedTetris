import * as ioClient from "socket.io-client";
import { Room } from "../models/Room";
import {
  SocketEvent,
  GameSpeed,
  GameHardcore,
  IUser,
} from "../entities/SocketEvent";
import { socketManagement } from "../models/Socket";

// tslint:disable-next-line: no-var-requires
const app = require("express")();
// tslint:disable-next-line: no-var-requires
const server = require("http").Server(app);

// tslint:disable-next-line: no-var-requires
let ioServer = require("socket.io")(server, {
  cookie: false,
  pingTimeout: 30000,
  pingInterval: 2000,
});

const rooms: Room[] = [];

const socketUrl: string = "http://localhost:5000";
const options: any = {
  transports: ["websocket"],
  "force new connection": true,
};

const props = {
  roomPrivate: {
    room: {
      id: "",
      inGame: false,
      players: [],
      gameMaster: { id: "", userName: "", roomId: "" },
      isPrivate: false,
      tetriminosList: [],
      spectrums: [],
    },
    error: "The room is private",
  },
  roomNotExisting: {
    room: {
      id: "3",
      inGame: false,
      players: [],
      gameMaster: { id: "5", userName: "5", roomId: "3" },
      isPrivate: false,
      tetriminosList: [],
      spectrums: [
        {
          id: "5",
          userName: "5",
          score: 0,
          spectrum: Array.from({ length: 20 }, () => Array(10).fill(0)),
        },
      ],
    },
  },
  userState: {
    currentPieceI: {
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
    user1: {
      id: "1",
      userName: "1",
      roomId: "1",
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
    user2: {
      id: "2",
      userName: "2",
      roomId: "1",
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
    user3: {
      id: "3",
      userName: "3",
      roomId: "1",
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
    user4: {
      id: "4",
      userName: "4",
      roomId: "1",
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
    user5: {
      id: "5",
      userName: "5",
      roomId: "1",
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
    roomSettings: {
      setMusic: true,
      setEffect: false,
      setSpectrum: false,
    },
    board1: {
      grid: [[0]],
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
      tmpGrid: [],
    },
  },
  roomState: {
    room: {
      id: "1",
      inGame: false,
      players: [
        {
          id: "1",
          userName: "1",
          roomId: "1",
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
        {
          id: "2",
          userName: "2",
          roomId: "1",
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
        {
          id: "3",
          userName: "3",
          roomId: "1",
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
        {
          id: "4",
          userName: "4",
          roomId: "1",
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
      ],
      gameMaster: {
        id: "1",
        userName: "1",
        roomId: "1",
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
      isPrivate: false,
      tetriminosList: [""],
      spectrums: [],
    },
    gameSettings: {
      gameSpeed: GameSpeed.NORMAL,
      rotations: true,
      hardcore: GameHardcore.ONE_LINE_FIVE_LIVES,
    },
    gameSettingsDone: false,
  },
};

describe("Server", () => {
  describe("Socket Events", () => {
    let client: SocketIOClient.Socket;

    beforeEach(() => {
      ioServer = socketManagement(ioServer, rooms);
      ioServer.listen(5000);
      client = ioClient.connect(socketUrl, options);
    });

    afterEach(() => {
      ioServer.close();
      client.close();
    });

    test("should test the socket connection", (done: any) => {
      ioServer.on(SocketEvent.CONNECT, (socket: any) => {
        if (socket) {
          done();
        }
      });
    });

    test("should register event CreatePlayerID", (done: any) => {
      client.on(SocketEvent.CONNECT, () => {
        client.on(SocketEvent.CREATE_USER, (data: string) => {
          if (data) {
            done();
          }
        });
      });
    });
    describe("testing joining room different cases", () => {
      test("Should Join room and create one", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user1 });
          client.on(SocketEvent.JOINING_ROOM, (data: any) => {
            if (data.room && data.error === "" && data.gameSettings) {
              done();
            }
          });
        });
      });

      test("Should Join room but already exists and is private", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user2 });
          client.on(SocketEvent.JOINING_ROOM, (data: any) => {
            if (
              data.error === props.roomPrivate.error &&
              data.room.id === props.roomPrivate.room.id
            ) {
              done();
            }
          });
        });
      });
      describe("Testing GameSettings by setting isPrivate to false to test the room full case", () => {
        test("Should update game settings of the room", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.REFRESH_GAME_SETTINGS, {
              rest: {
                gameSettings: props.roomState.gameSettings,
                room: props.roomState.room,
              },
            });
            client.on(SocketEvent.REFRESH_ROOM, (data: any) => {
              if (
                data.gameSettings.gameSpeed ===
                  props.roomState.gameSettings.gameSpeed &&
                data.gameSettings.rotations ===
                  props.roomState.gameSettings.rotations &&
                data.gameSettings.hardcore ===
                  props.roomState.gameSettings.hardcore &&
                data.room.isPrivate === false
              ) {
                props.roomState.room.tetriminosList = data.room.tetriminosList;
                done();
              }
            });
          });
        });
        test("Should not update game settings of the room because it does not exists", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.REFRESH_GAME_SETTINGS, {
              rest: {
                gameSettings: props.roomState.gameSettings,
                room: props.roomNotExisting,
              },
            });
            done();
          });
        });
      });
      test("Should join Room with player2-3-4", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user2 });
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user3 });
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user4 });
          client.on(SocketEvent.JOINING_ROOM, (data: any) => {
            if (data.room.players.length === 4) {
              done();
            }
          });
        });
      });
      test("Should join Room with player5 but returns the full error", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user5 });
          client.on(SocketEvent.JOINING_ROOM, (data: any) => {
            if (data.error === "The room is full") {
              done();
            }
          });
        });
      });
      test("Should change settings of the room", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.JOIN_ROOM, { rest: props.userState.user5 });
          client.on(SocketEvent.JOINING_ROOM, (data: any) => {
            if (data.error === "The room is full") {
              done();
            }
          });
        });
      });
      describe("Testing board file", () => {
        test("Should return empty grid", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "",
                board: [],
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              props.userState.board1 = data.board;
              done();
            });
          });
        });
        test("Receiving right move from client on board", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowRight",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.pos.x >
                props.userState.board1.currentPiece.pos.x
              ) {
                done();
              }
            });
          });
        });
        test("Receiving down move from client on board", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowDown",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.pos.y >
                props.userState.board1.currentPiece.pos.y
              ) {
                done();
              }
            });
          });
        });
        test("Receiving up move from client on board", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowUp",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.shapeState >
                props.userState.board1.currentPiece.shapeState
              ) {
                done();
              }
            });
          });
        });
        test("Receiving left move from client on board", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowLeft",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.pos.x <
                props.userState.board1.currentPiece.pos.x
              ) {
                done();
              }
            });
          });
        });
        test("Should change shape with a wallKick when up move against wall from client on board", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            props.roomState.room.tetriminosList[0] = "I";
            rooms[0].room.tetriminosList[0] = "I";
            props.userState.board1.currentPiece = props.userState.currentPieceI;
            props.userState.user1.idPiece = 0;
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowUp",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.shapeState >
                props.userState.board1.currentPiece.shapeState
              ) {
                props.userState.board1.currentPiece = data.board.currentPiece;
                done();
              }
            });
          });
        });
        test("Should change the current piece of the user and keep his piece ", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "q",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.tetrimino ===
                  props.roomState.room.tetriminosList[1] &&
                data.board.currentPiece.shapeState === 0 &&
                data.board.currentPiece.pos.y === 0
              ) {
                done();
              }
            });
          });
        });
        test("Should change the current piece of the user and keep his piece and swipe with the current piece kept ", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            props.userState.user1.pieceKeep.piece = "L";
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "q",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.tetrimino ===
                  props.userState.user1.pieceKeep.piece &&
                data.board.currentPiece.shapeState === 0 &&
                data.board.currentPiece.pos.y === 0
              ) {
                done();
              }
            });
          });
        });
        test("Should make the piece fall down to the bottom ", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: " ",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.pos.y >
                props.userState.board1.currentPiece.pos.y
              ) {
                props.userState.board1.currentPiece = data.board.currentPiece;
                props.userState.board1.grid = data.board.grid;
                done();
              }
            });
          });
        });
        test("Should move down but blocked so place the piece into the grid ", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowDown",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.currentPiece.pos.y === 0 &&
                data.board.currentPiece.tetrimino ===
                  props.roomState.room.tetriminosList[1]
              ) {
                props.userState.board1.currentPiece = data.board.currentPiece;
                done();
              }
            });
          });
        });
        test("Should add undestructibles lines and remove user lives", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.currentPiece.pos.y = 17;
            props.userState.board1.grid.splice(0, 3);
            props.roomState.gameSettings.hardcore =
              GameHardcore.ONE_LINE_ONE_DIE;
            rooms[0].gameSettings.hardcore = GameHardcore.ONE_LINE_ONE_DIE;
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowDown",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              let i: number = 0;
              if (data.board.grid[19][0] === 0) {
                rooms[0].room.players.forEach((o: IUser) => {
                  if (o.gameOver === true) i++;
                });
                if (i > 0) {
                  done();
                }
              }
            });
          });
        });
        test("Should add undestructibles lines and Game over one random user", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.currentPiece.pos.y = 17;
            props.userState.board1.grid.splice(0, 2);
            props.roomState.gameSettings.hardcore =
              GameHardcore.ONE_LINE_FIVE_LIVES;
            rooms[0].gameSettings.hardcore = GameHardcore.ONE_LINE_FIVE_LIVES;
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowDown",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (
                data.board.grid[19][0] === 0 &&
                rooms[0].room.players[1].life < 5
              ) {
                done();
              }
            });
          });
        });
        test("Should place one tetrimino, and generate new tetrimino list", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.currentPiece.pos.y = 17;
            props.userState.board1.grid.splice(0, 2);
            const tmpTetrimino = rooms[0].room.tetriminosList[5];
            rooms[0].room.tetriminosList = ["I", "I", "I"];
            props.roomState.room.tetriminosList = ["I", "I", "I"];
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowDown",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (tmpTetrimino !== rooms[0].room.tetriminosList[5]) {
                done();
              }
            });
          });
        });
        test("Should place 2 undestructibles lines du to linesToAdd", (done: any) => {
          client.on(SocketEvent.CONNECT, () => {
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.grid.push(Array(10).fill(1));
            props.userState.board1.currentPiece.pos.y = 17;
            props.userState.board1.grid.splice(0, 2);
            rooms[0].room.players[0].linesToAdd = 1;
            props.userState.user1.linesToAdd = 1;
            client.emit(SocketEvent.BOARD, {
              rest: {
                user: props.userState.user1,
                room: props.roomState.room,
                move: "ArrowDown",
                board: props.userState.board1,
              },
            });
            client.on(SocketEvent.BOARD, (data: any) => {
              if (data.board.grid[19][0] === -1) {
                done();
              }
            });
          });
        });
      });
    });
    describe("Testing to set room in game", () => {
      test("Should pass room.inGame to true", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          rooms[0].room.inGame = true;
          client.emit(SocketEvent.SET_ROOM_IN_GAME, { rest: rooms[0].room });
          client.on(SocketEvent.REFRESH_ROOM, (data: any) => {
            if (data.room.inGame === true) {
              done();
            }
          });
        });
      });
    });
    describe("Testing leave room action", () => {
      test("Should leave room for user1", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.LEAVE_ROOM, {
            rest: rooms[0].room.players[0],
          });
          client.on(SocketEvent.REFRESH_ROOM, (data: any) => {
            if (rooms[0].room.gameMaster.id === "2") {
              done();
            }
          });
        });
      });
      test("Should leave room for user2", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.LEAVE_ROOM, {
            rest: rooms[0].room.players[0],
          });
          client.on(SocketEvent.REFRESH_ROOM, (data: any) => {
            if (rooms[0].room.gameMaster.id === "3") {
              done();
            }
          });
        });
      });
      test("Should leave room for user3", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.LEAVE_ROOM, {
            rest: rooms[0].room.players[0],
          });
          client.on(SocketEvent.REFRESH_ROOM, (data: any) => {
            if (rooms[0].room.gameMaster.id === "4") {
              done();
            }
          });
        });
      });
      test("Should leave room for user4", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit(SocketEvent.LEAVE_ROOM, {
            rest: rooms[0].room.players[0],
          });
          client.on(SocketEvent.REFRESH_ROOM, (data: any) => {
            if (!rooms[0]) {
              done();
            }
          });
        });
      });
      test("Should disconnect from client", (done: any) => {
        client.on(SocketEvent.CONNECT, () => {
          client.emit("Disconnect");
          done();
        });
      });
    });
  });
});
