import { Piece, IPos } from "./Piece";
import {
  SocketEvent,
  wallKickDataButI,
  wallKickDataI,
  IScore,
  IRoom,
  IUser,
  GameHardcore,
} from "../entities/SocketEvent";
import { Board } from "./Board";
import { findRoom, refreshRoomEmit, updateUserMalusEmit } from "./Socket";
import { Room } from "./Room";
import { randomizer } from "./Randomizer";
import * as _ from "lodash";

const KEY = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  SPACE: " ",
  UP: "ArrowUp",
  KEEP: "q",
};
// Object.freeze(KEY);

export interface UserPiece {
  shape: number[][];
  color: string;
  width: number;
  height: number;
  pos: IPos;
  tetrimino: string;
}

export interface UserBoard {
  grid: number[][];
  currentPiece: UserPiece;
}

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};
//   Object.freeze(POINTS);

const moves = {
  [KEY.LEFT]: (p: Piece) =>
    ({ ...p, pos: { x: p.pos.x - 1, y: p.pos.y } } as Piece),
  [KEY.RIGHT]: (p: Piece) =>
    ({ ...p, pos: { x: p.pos.x + 1, y: p.pos.y } } as Piece),
  [KEY.DOWN]: (p: Piece) =>
    ({ ...p, pos: { y: p.pos.y + 1, x: p.pos.x } } as Piece),
  [KEY.SPACE]: (p: Piece) =>
    ({ ...p, pos: { y: p.pos.y + 1, x: p.pos.x } } as Piece),
  [KEY.UP]: (p: Piece) => p.currentPieceRotation(p),
};

const wallKickMove = (newBoard: Board, p: Piece): Board => {
  let wallKickPiece: Piece = p;
  let i = 0;
  while (!newBoard.isValid(wallKickPiece) && i < 4) {
    const x =
      p.tetrimino === "I"
        ? wallKickDataI[p.shapeState][i][0]
        : wallKickDataButI[p.shapeState][i][0];
    const y =
      p.tetrimino === "I"
        ? wallKickDataI[p.shapeState][i][1]
        : wallKickDataButI[p.shapeState][i][1];
    wallKickPiece = {
      ...p,
      pos: { ...p.pos, x: p.pos.x + x, y: p.pos.y + y },
    } as Piece;
    i++;
  }
  if (newBoard.isValid(wallKickPiece)) {
    newBoard.currentPiece = wallKickPiece;
    if (newBoard.currentPiece.shapeState === 3)
      newBoard.currentPiece.shapeState = 0;
    else newBoard.currentPiece.shapeState++;
  }
  return newBoard;
};

const generatorRandomTetri = (piecesList: any) => {
  const random = randomizer();
  for (let i = 0; i < 5; i++) {
    piecesList.push(random.next().value);
  }
  return piecesList;
};

const play = (socket: any, rooms: Room[]) => {
  let toEmitRoom: number = 0;
  socket.on(SocketEvent.BOARD, (data: any) => {
    const board = data.rest.board;
    const user: IUser = data.rest.user;
    const iRoom: IRoom = data.rest.room;
    const room: Room = findRoom(iRoom, rooms);
    const move = data.rest.move;
    let newBoard: Board = new Board(room.room.tetriminosList[user.idPiece]);
    if (move && board && board.currentPiece.tetrimino !== "" && newBoard) {
      const piece: Piece = new Piece(
        board.currentPiece.tetrimino,
        board.currentPiece.pos
      );
      newBoard.currentPiece = piece;
      newBoard.currentPiece.shape = board.currentPiece.shape;
      newBoard.currentPiece.shapeState = board.currentPiece.shapeState;
      newBoard.grid = board.grid;
      if (user.linesToAdd > 0) {
        let i: number = 0;
        while (i < user.linesToAdd) {
          newBoard.grid.push(Array(10).fill(-1));
          i++;
        }
        newBoard.grid.splice(0, user.linesToAdd);
        user.linesToAdd = 0;
      }
      if (move === KEY.UP) {
        const p = moves[KEY.UP](newBoard.currentPiece);
        if (newBoard.isValid(p)) {
          newBoard.currentPiece = newBoard.currentPiece.currentPieceRotation(
            newBoard.currentPiece
          );
          if (newBoard.currentPiece.shapeState === 3)
            newBoard.currentPiece.shapeState = 0;
          else newBoard.currentPiece.shapeState++;
        } else {
          newBoard = wallKickMove(newBoard, p);
        }
      } else {
        if (move === KEY.KEEP) {
          if (user.pieceKeep.canKeep === true) {
            let pieceExchange: Piece;
            if (user.pieceKeep.piece !== "") {
              pieceExchange = new Piece(user.pieceKeep.piece);
              user.pieceKeep.piece = room.room.tetriminosList[user.idPiece];
            } else {
              user.pieceKeep.piece = newBoard.currentPiece.tetrimino;
              user.idPiece += 1;
              pieceExchange = new Piece(room.room.tetriminosList[user.idPiece]);
            }
            if (newBoard.isValid(pieceExchange)) {
              newBoard.currentPiece = pieceExchange;
              newBoard.currentPiece.shape = pieceExchange.shape;
              newBoard.currentPiece.shapeState = pieceExchange.shapeState;
              toEmitRoom++;
            }
            user.pieceKeep.canKeep = false;
          }
        } else {
          let p = moves[move](newBoard.currentPiece);
          if (move === KEY.SPACE) {
            while (newBoard.isValid(p)) {
              user.score += POINTS.HARD_DROP;
              newBoard.move(p);
              p = moves[KEY.DOWN](newBoard.currentPiece);
            }
          }
          if (newBoard.isValid(p)) {
            newBoard.move(p);
            if (move === KEY.DOWN) {
              user.score += POINTS.SOFT_DROP;
            }
          } else if (!newBoard.isValid(p) && move === KEY.DOWN) {
            const score: IScore = newBoard.freeze();
            user.score += score.points;
            user.lines += score.lines;
            user.idPiece++;
            user.pieceKeep.canKeep = true;
            if (!room.room.tetriminosList[user.idPiece + 3])
              room.room.tetriminosList = generatorRandomTetri(
                room.room.tetriminosList
              );
            if (score.lines > 1 && room.room.players.length > 1) {
              _.forEach(room.room.players, (o: IUser) => {
                if (o.id !== user.id) {
                  o.linesToAdd = score.lines - 1;
                  updateUserMalusEmit(room, socket, false, o);
                }
              });
            }
            if (
              score.lines > 0 &&
              room.gameSettings.hardcore === GameHardcore.ONE_LINE_FIVE_LIVES
            ) {
              _.forEach(room.room.players, (o: IUser) => {
                if (o.id !== user.id) {
                  o.life = o.life - 1;
                  if (o.life === 0) o.gameOver = true;
                  updateUserMalusEmit(room, socket, false, o);
                }
              });
            }
            if (
              score.lines > 0 &&
              room.gameSettings.hardcore === GameHardcore.ONE_LINE_ONE_DIE
            ) {
              let i = Math.floor(Math.random() * room.room.players.length);
              while (room.room.players[i].id === user.id) {
                i = Math.floor(Math.random() * room.room.players.length);
              }
              room.room.players[i].gameOver = true;
              _.forEach(room.room.players, (o: IUser) => {
                if (o.id !== user.id) {
                  updateUserMalusEmit(room, socket, false, o);
                }
              });
            }
            room.generateSpectrum(newBoard.grid, user);
            toEmitRoom++;
            const nextPiece: Piece = new Piece(
              iRoom.tetriminosList[user.idPiece]
            );
            newBoard.isValid(nextPiece)
              ? (newBoard.currentPiece = nextPiece)
              : (user.gameOver = true);
          }
        }
      }
    }
    if (user.gameOver === true) {
      socket.emit(SocketEvent.UPDATE_USER, user);
    } else {
      const shadowBoard: Board = new Board(newBoard.currentPiece.tetrimino);
      const shadowPiece: Piece = new Piece(newBoard.currentPiece.tetrimino, {
        x: newBoard.currentPiece.pos.x,
        y: newBoard.currentPiece.pos.y,
      });
      shadowPiece.shape = newBoard.currentPiece.shape.map((row, y) => {
        return row.map((value, x) => {
          if (value > 0) {
            value = value * 10;
          }
          return value;
        });
      });
      shadowBoard.currentPiece = shadowPiece;
      shadowBoard.currentPiece.shapeState = newBoard.currentPiece.shapeState;
      shadowBoard.grid = newBoard.grid;
      let p = moves[KEY.DOWN](shadowBoard.currentPiece);
      while (shadowBoard.isValid(p)) {
        shadowBoard.move(p);
        p = moves[KEY.DOWN](shadowBoard.currentPiece);
      }
      newBoard.draw();
      newBoard.drawShadow(shadowBoard.currentPiece);
      socket.emit(SocketEvent.BOARD, { board: newBoard });
    }
    if (toEmitRoom > 0) {
      room.room.players[
        _.findIndex(room.room.players, (o: IUser) => {
          return o.id === user.id;
        })
      ] = user;
      refreshRoomEmit(room, socket, true);
    }
    socket.emit(SocketEvent.UPDATE_USER, user);
  });
};

export default play;
