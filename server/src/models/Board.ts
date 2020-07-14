import { Piece } from "./Piece";
import * as _ from "lodash";
import { IScore } from "@entities";
import { POINTS } from "./Game";

export class Board {
  public grid: number[][];
  public currentPiece: Piece;
  public tmpGrid: number[][];

  constructor(tetrimino: string) {
    this.grid = Array.from({ length: 20 }, () => Array(10).fill(0));
    this.currentPiece = new Piece(tetrimino);
    this.tmpGrid = this.grid;
  }

  public move(p: Piece): void {
    this.currentPiece.pos.x = p.pos.x;
    this.currentPiece.pos.y = p.pos.y;
  }

  private isEmpty(value: number): boolean {
    return value === 0;
  }

  private isFree(x: number, y: number): boolean {
    // if (!this.grid[y]) return false;
    return this.grid[y] && this.grid[y][x] === 0;
  }

  private insideWalls(x: number): boolean {
    return x >= 0 && x < 10;
  }

  private aboveFloor(y: number): boolean {
    return y >= 0 && y < 20;
  }

  public isValid(p: Piece): boolean {
    return p.shape.every((row: any, dy: any) => {
      return row.every((value: any, dx: any) => {
        const x = p.pos.x + dx;
        const y = p.pos.y + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) && this.aboveFloor(y) && this.isFree(x, y))
        );
      });
    });
  }

  public draw(): void {
    const piece = this.currentPiece;
    this.tmpGrid = this.grid.map((row, y) => {
      return row.map((value, x) => {
        if (
          x >= piece.pos.x &&
          y >= piece.pos.y &&
          x - piece.pos.x <= piece.width &&
          y - piece.pos.y <= piece.height
        ) {
          value = value ? value : piece.shape[y - piece.pos.y][x - piece.pos.x];
        }
        return value;
      });
    });
  }

  public drawShadow(piece: Piece): void {
    // const piece = piece;
    this.tmpGrid = this.tmpGrid.map((row, y) => {
      return row.map((value, x) => {
        if (
          x >= piece.pos.x &&
          y >= piece.pos.y &&
          x - piece.pos.x <= piece.width &&
          y - piece.pos.y <= piece.height
        ) {
          value = value ? value : piece.shape[y - piece.pos.y][x - piece.pos.x];
        }
        return value;
      });
    });
  }

  public freeze(): IScore {
    this.currentPiece.shape.forEach((row: any, y: any) => {
      row.forEach((value: any, x: any) => {
        if (value > 0) {
          this.grid[y + this.currentPiece.pos.y][
            x + this.currentPiece.pos.x
          ] = value;
        }
      });
    });
    return this.clearLines();
  }

  private clearLinesPoints(lines: number): number {
    switch (lines) {
      case 1:
        return POINTS.SINGLE;
      case 2:
        return POINTS.DOUBLE;
      case 3:
        return POINTS.TRIPLE;
      case 4:
        return POINTS.TETRIS;
      default:
        return 0;
    }
  }

  private clearLines(): IScore {
    let lines: number = 0;
    this.grid.forEach((row, y) => {
      // If every value is greater than 0.
      if (row.every((value) => value > 0)) {
        lines++;
        // Remove the row.
        this.grid.splice(y, 1);
        // Add zero filled row at the top.
        this.grid.unshift(Array(10).fill(0));
      }
    });

    const score: IScore = {
      points: this.clearLinesPoints(lines),
      lines,
    };
    return score;
  }
}
