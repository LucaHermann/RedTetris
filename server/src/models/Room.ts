import { IUser, IRoom, IGameSettings, GameSpeed, GameHardcore } from "../entities/SocketEvent";
import * as _ from "lodash";
import { randomizer } from "./Randomizer";

export class Room {
  public room: IRoom;
  public gameSettings: IGameSettings;
  constructor(user: IUser) {
    this.room = this.createRoom(user);
    this.room.tetriminosList = this.generateTetriminos();
    this.gameSettings = {
      gameSpeed: GameSpeed.NORMAL,
      rotations: false,
      hardcore: GameHardcore.NONE,
    };
  }

  public createRoom(user: IUser): IRoom {
    const room: IRoom = {
      id: user.roomId,
      inGame: false,
      gameMaster: user,
      players: [user],
      isPrivate: true,
      tetriminosList: [],
      spectrums: [{id: user.id, userName: user.userName, score: user.score, spectrum: Array.from({ length: 20 }, () => Array(10).fill(0))}]
    };
    return room;
  }


  public generateTetriminos() {
    const random = randomizer();
    let i = 0;
    while (i < 50) {
      this.room.tetriminosList.push(random.next().value);
      i++;
    }
    return this.room.tetriminosList;
  }


  public generateSpectrum(grid: number[][], user: IUser): void {
    const idSpectrum = _.findIndex(this.room.spectrums, {id: user.id});
    this.room.spectrums[idSpectrum].spectrum = Array.from({ length: 20 }, () => Array(10).fill(0));
    const i: number[] = [];
    if (idSpectrum >= 0) {
      grid.forEach((row: any, y: any) => {
        row.forEach((value: any, x: any) => {
          if (value > 0) {
            if (_.indexOf(i, x) === -1) i.push(x);
          }
          if (_.indexOf(i, x) >= 0) {
            this.room.spectrums[idSpectrum].spectrum[y][x] = 9;
          }
        });
      });
    }
  }

  public addPlayer(user: IUser): void {
    this.room.players.push(user);
    this.room.spectrums.push({id: user.id, userName: user.userName, score: user.score, spectrum: Array.from({ length: 20 }, () => Array(10).fill(0))});
  }

  public isRoomPublic(): boolean {
    return this.room.isPrivate;
  }

  public isRoomFull(): boolean {
    return this.room.players.length > 3 ? true : false;
  }

  public setRoomPrivate(isPrivate: boolean): void {
    this.room.isPrivate = isPrivate;
  }

  public removePlayer(user: IUser): void {
    _.remove(this.room.players, user);
    // tslint:disable-next-line: no-unused-expression
    this.room.players.length < 1 ? null : (this.room.gameMaster = this.room.players[0]);
  }

  public setRotations(rotations: boolean): void {
    this.gameSettings.rotations = rotations;
  }

  public setHardcore(hardcore: GameHardcore): void {
    this.gameSettings.hardcore = hardcore;
  }

  public setGameSpeed(gameSpeed: GameSpeed): void {
    this.gameSettings.gameSpeed = gameSpeed;
  }

  public setRoomInGame(inGame: boolean): void {
    this.room.inGame = inGame;
  }
}
