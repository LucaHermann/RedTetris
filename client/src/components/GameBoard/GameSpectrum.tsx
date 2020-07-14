import React from "react";

import "./GameSpectrum.css";
import { IRoom, ISpectrums } from "src/reducers/roomReducer";
import { IUser } from "../../reducers/userReducers";
import TestSpectrum from "./testSpectrum";

interface IProps {
  room: IRoom;
  user: IUser;
}

const GameSpectrum: React.FC<IProps> = (props) => {
  const spectrums: ISpectrums[] = props.room.spectrums;
  if (props.room.players.length > 1) {
    return (
      <div className="SpectrumContainer">
        {spectrums &&
          spectrums.map((spectrum) => {
            if (spectrum.id !== props.user.id) {
              return (
                <div key={spectrum.id}>
                  <p
                    style={{
                      fontSize: "0.6em",
                      marginTop: "2.5em",
                      marginBottom: "0em",
                      marginLeft: "12em",
                      color: "#31E981",
                    }}
                  >
                    Spectrum
                  </p>
                  <div className="GameSpectrum">
                    <div className="GameSpectrumAdverse">
                      <TestSpectrum spectrum={spectrum.spectrum} />
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    );
  }
  return <div />;
};

export default GameSpectrum;
