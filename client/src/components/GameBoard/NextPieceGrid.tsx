import React from "react";
import "./testSpectrum.css";
import "./NextPieceGrid.css";

export const pieces = [
  {
    color: "blue",
  },
  {
    color: "green",
  },
  {
    color: "cyan",
  },
  {
    color: "orange",
  },
  {
    color: "purple",
  },
  {
    color: "yellow",
  },
  {
    color: "red",
  },
];

interface IProps {
  spectrum: number[][];
}

const NextPieceGrid: React.FC<IProps> = (props) => {
  return (
    <div
      className="Grid"
      style={{ width: "auto", height: "inherit", border: "none" }}
    >
      {props.spectrum.map((rows, y) => {
        return (
          <div className="Line" style={{ height: "25% !important" }} key={y}>
            {rows.map((_value, x) => {
              return (
                <div
                  className="Case"
                  key={x}
                  style={
                    _value
                      ? { backgroundColor: pieces[_value - 1].color }
                      : { backgroundColor: "#00120B" }
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

export default NextPieceGrid;
