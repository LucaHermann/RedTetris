import { pieces } from "./Pieces";
import * as _ from "lodash";

export interface IPos {
  x: number;
  y: number;
}
export class Piece {
  public shape: number[][];
  public color: string;
  public width: number;
  public height: number;
  public pos: IPos;
  public tetrimino: string;
  public shapeState: number;

  constructor(tetrimino: string, pos = { x: 4, y: 0 }) {
    this.tetrimino = tetrimino;
    const piece: any = pieces.find((p) => p.name === tetrimino);
    this.shape = piece.shape;
    this.color = piece.color;
    this.width = this.shape[0].length - 1;
    this.height = this.shape.length - 1;
    this.pos = pos;
    this.shapeState = 0;
  }

  public currentPieceRotation(p: Piece) {
    const clone: Piece = JSON.parse(JSON.stringify(p));
    for (let y = 0; y < clone.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [clone.shape[x][y], clone.shape[y][x]] =
          [clone.shape[y][x], clone.shape[x][y]];
      }
    }
    clone.shape.forEach(row => row.reverse());
    return clone;
  }
}
