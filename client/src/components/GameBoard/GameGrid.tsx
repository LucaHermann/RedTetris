import React from "react";

import "./GameGrid.css";
import { Board } from "../../reducers/userReducers";

export const pieces = [
  {
    color: "blue",
    opacity: 1,
  },
  {
    color: "green",
    opacity: 1,
  },
  {
    color: "cyan",
    opacity: 1,
  },
  {
    color: "orange",
    opacity: 1,
  },
  {
    color: "purple",
    opacity: 1,
  },
  {
    color: "yellow",
    opacity: 1,
  },
  {
    color: "red",
    opacity: 1,
  },
  { color: "", opacity: 1 },
  {
    color: "blue",
    opacity: 0.5,
  },
  {
    color: "green",
    opacity: 0.5,
  },
  {
    color: "cyan",
    opacity: 0.5,
  },
  {
    color: "orange",
    opacity: 0.5,
  },
  {
    color: "purple",
    opacity: 0.5,
  },
  {
    color: "yellow",
    opacity: 0.5,
  },
  {
    color: "red",
    opacity: 0.5,
  },
];

interface IProps {
  board: Board;
}

const GameGrid: React.FC<IProps> = (props) => {
  return (
    <div className="Grid">
      {props.board.tmpGrid.map((rows, y) => {
        return (
          <div className="Line" key={y}>
            {rows.map((_value, x) => {
              return (
                <div
                  className="Case"
                  key={x}
                  style={
                    _value
                      ? {
                          backgroundColor:
                            pieces[
                              _value > 9
                                ? _value / 10 - 1
                                : _value === -1
                                ? 7
                                : _value - 1
                            ].color,
                          opacity: _value > 9 ? 0.5 : 1,
                        }
                      : { backgroundColor: "lightgrey" }
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameGrid;
