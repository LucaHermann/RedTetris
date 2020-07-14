/* eslint-disable @typescript-eslint/no-unused-vars */
import * as io from "socket.io";
import * as _ from "lodash";
import { Room } from "./Room";

import { SocketEvent, IRoom, IUser, IGameSettings } from "./SocketEvent";

/* istanbul ignore file */

export function refreshRoomEmit(
  room: Room,
  socket: SocketIO.Socket,
  all: boolean
) {
  _.forEach(room.room.players, (o: IUser) => {
    socket
      .to(o.id)
      .emit(SocketEvent.REFRESH_ROOM, { room: room.room, error: "" });
  });
  if (all === true) {
    socket.emit(SocketEvent.REFRESH_ROOM, { room: room.room, error: "" });
  }
}

// tslint:disable-next-line: no-shadowed-variable
export function socketManagement(io: io.Server, rooms: Room[]) {
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
      tetriminosList: [],
      spectrums: [],
      isPrivate: false,
    };
    console.log(`Connected client with socket id ${socket.id}`);
    socket.emit(SocketEvent.CREATE_USER, socket.id);
    socket.on(SocketEvent.JOIN_ROOM, (rest: any) => {
      const user: IUser = rest.rest;
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
        if (room.isRoomFull() === true || room.isRoomPublic() === true) {
          const error: string =
            room.isRoomFull() === true
              ? "The room is full"
              : "The room is private";
          socket.emit(SocketEvent.JOINING_ROOM, { room: newRoom, error });
          socket.emit(SocketEvent.UPDATE_USER, {
            user: { id: user.id, userName: user.userName, roomId: "" },
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
        socket.emit(SocketEvent.UPDATE_USER, user);
        socket.emit(SocketEvent.REFRESH_ROOM, newRoom);
      } else {
        console.log(
          "This should not happen, it means you are leaving an unexisting room "
        );
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
        } else {
          console.log(
            "This should not happen, it means you are changing settings of an unexisting room"
          );
        }
      }
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
