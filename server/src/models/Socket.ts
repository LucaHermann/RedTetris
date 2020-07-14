import * as io from "socket.io";
import { logger } from "../shared/Logger";
import * as _ from "lodash";
import { Room } from "./Room";
import socketIo from "socket.io";

import {
  SocketEvent,
  IRoom,
  IUser,
  IGameSettings,
} from "../entities/SocketEvent";
import play from "./Game";
import { Board } from "./Board";

export function refreshRoomEmit(
  room: Room,
  socket: SocketIO.Socket,
  all: boolean
) {
  _.forEach(room.room.players, (o: IUser) => {
    socket.to(o.id).emit(SocketEvent.REFRESH_ROOM, {
      room: room.room,
      error: "",
      gameSettings: room.gameSettings,
    });
  });
  if (all === true) {
    socket.emit(SocketEvent.REFRESH_ROOM, {
      room: room.room,
      error: "",
      gameSettings: room.gameSettings,
    });
  }
}

export function updateUserMalusEmit(
  room: Room,
  socket: SocketIO.Socket,
  all: boolean,
  user: IUser
) {
  _.forEach(room.room.players, (o: IUser) => {
    socket.to(o.id).emit(SocketEvent.UPDATE_USER, user);
  });
  if (all === true) {
    socket.emit(SocketEvent.UPDATE_USER, user);
  }
}

export function refreshBoardEmit(
  board: Board,
  room: Room,
  socket: SocketIO.Socket,
  all: boolean
) {
  _.forEach(room.room.players, (o: IUser) => {
    socket.to(o.id).emit(SocketEvent.BOARD, {
      board: {
        grid: board.grid,
        tmpGrid: board.tmpGrid,
        currentPiece: {
          shape: board.currentPiece.shape,
          color: board.currentPiece.color,
          height: board.currentPiece.height,
          width: board.currentPiece.width,
          pos: board.currentPiece.pos,
          tetrimino: board.currentPiece.tetrimino,
          shapeState: board.currentPiece.shapeState,
        },
      },
    });
  });
  if (all === true) {
    socket.emit(SocketEvent.BOARD, {
      board: {
        grid: board.grid,
        tmpGrid: board.tmpGrid,
        currentPiece: {
          shape: board.currentPiece.shape,
          color: board.currentPiece.color,
          height: board.currentPiece.height,
          width: board.currentPiece.width,
          pos: board.currentPiece.pos,
          tetrimino: board.currentPiece.tetrimino,
          shapeState: board.currentPiece.shapeState,
        },
      },
    });
  }
}

export function findRoom(room: IRoom, rooms: Room[]): Room {
  return _.find(rooms, { room: { id: room.id } })!;
}

export function socketManagement(server: any, rooms: Room[]) {
  // tslint:disable-next-line: no-shadowed-variable
  const io: io.Server = socketIo(server);

  io.on(SocketEvent.CONNECT, (socket: SocketIO.Socket) => {
    const newRoom: IRoom = {
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
          canKeep: true,
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5,
      },
      isPrivate: false,
      tetriminosList: [],
      spectrums: [],
    };
    logger.info(`Connected client with socket id ${socket.id}`);
    socket.emit(SocketEvent.CREATE_USER, socket.id);
    socket.on(SocketEvent.JOIN_ROOM, (rest: any) => {
      const user: IUser = rest.rest;
      if (!user.idPiece) user.idPiece = 0;
      const room = _.find(rooms, { room: { id: user.roomId } });
      if (!room) {
        // tslint:disable-next-line: no-shadowed-variable
        const newRoom: Room = new Room(user);
        rooms.push(newRoom);
        socket.emit(SocketEvent.JOINING_ROOM, {
          room: newRoom.room,
          error: "",
          gameSettings: newRoom.gameSettings,
        });
        socket.emit(SocketEvent.UPDATE_USER, user);
      } else {
        if (
          room.isRoomFull() === true ||
          room.isRoomPublic() === true ||
          room.room.inGame === true
        ) {
          const error: string =
            room.isRoomFull() === true
              ? "The room is full"
              : room.room.inGame === true
              ? "The game as already been started"
              : "The room is private";
          socket.emit(SocketEvent.JOINING_ROOM, { room: newRoom, error });
          socket.emit(SocketEvent.UPDATE_USER, {
            user: {
              id: user.id,
              userName: user.userName,
              roomId: "",
              idPiece: 0,
              linesToAdd: 0,
              gameOver: false,
            },
          });
        } else {
          room.addPlayer(user);
          socket.emit(SocketEvent.JOINING_ROOM, {
            room: room.room,
            error: "",
            gameSettings: room.gameSettings,
          });
          refreshRoomEmit(room, socket, false);
          socket.emit(SocketEvent.UPDATE_USER, user);
        }
      }
    });
    socket.on(SocketEvent.LEAVE_ROOM, (rest: any) => {
      const user: IUser = rest.rest;
      const room = _.find(rooms, { room: { id: user.roomId } });
      if (room) {
        room.removePlayer(user);
        room.room.players.length <= 0
          ? _.remove(rooms, room)
          : refreshRoomEmit(room, socket, true);
        user.roomId = "";
        socket.emit(SocketEvent.UPDATE_USER, {
          id: user.id,
          userName: "",
          roomId: "",
          idPiece: 0,
          score: 0,
          lines: 0,
          linesToAdd: 0,
          pieceKeep: {
            piece: "",
            canKeep: true,
          },
          gameOver: false,
          life: 0,
        });
        socket.emit(SocketEvent.REFRESH_ROOM, newRoom);
      }
    });
    socket.on(SocketEvent.REFRESH_GAME_SETTINGS, (rest: any) => {
      if (rest.rest.room && rest.rest.gameSettings) {
        // tslint:disable-next-line: no-shadowed-variable
        const newRoom: IRoom = rest.rest.room;
        const newSettings: IGameSettings = rest.rest.gameSettings;
        const room = _.find(rooms, { room: { id: newRoom.id } });
        if (room) {
          newRoom.isPrivate
            ? room.setRoomPrivate(true)
            : room.setRoomPrivate(false);
          room.setGameSpeed(newSettings.gameSpeed);
          room.setRotations(newSettings.rotations);
          room.setHardcore(newSettings.hardcore);
          socket.emit(SocketEvent.REFRESH_ROOM, {
            room: room.room,
            error: "",
            gameSettings: room.gameSettings,
          });
        }
      }
    });
    socket.on(SocketEvent.SET_ROOM_IN_GAME, (rest: any) => {
      // tslint:disable-next-line: no-shadowed-variable
      const newRoom: IRoom = rest.rest;
      const room = _.find(rooms, { room: { id: newRoom.id } });
      if (room) {
        room.setRoomInGame(newRoom.inGame);
        refreshRoomEmit(room, socket, true);
      }
    });
    play(socket, rooms);
    socket.on("Disconnect", () => {
      logger.info("Client disconnected");
      logger.error("Client disconnected");
    });
  });
  return io;
}
