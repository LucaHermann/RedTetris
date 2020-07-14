import React from "react";
import "./testSpectrum.css";

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

const TestSpectrum: React.FC<IProps> = (props) => {
  return (
    <div
      className="Grid"
      style={{ width: "auto", height: "inherit", border: "none" }}
    >
      {props.spectrum.map((rows, y) => {
        return (
          <div className="Line" key={y}>
            {rows.map((_value, x) => {
              return (
                <div
                  className="Case"
                  key={x}
                  style={
                    _value === 9
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "grey" }
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

export default TestSpectrum;
