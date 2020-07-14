/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Segment, Checkbox, Grid } from "semantic-ui-react";

import { IRoom, IGameSettings, GameHardcore } from "../../reducers/roomReducer";

interface IProps {
  room: IRoom;
  refreshGameSettings: any;
  gameSettings: IGameSettings;
}

const GameModeCheckBox: React.SFC<IProps> = props => {
  const [form, setForm] = useState({
    gameSpeed: "Normal",
    rotate: false,
    enableHardcore: false,
    hardcore: "NONE"
  });

  const { refreshGameSettings } = props;

  useEffect(() => {
    refreshGameSettings({ room: props.room, gameSettings: props.gameSettings });
  }, [form]);

  const gameSpeedChanged = (e: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
    e.preventDefault();
    setForm({ gameSpeed: value, rotate: form.rotate, hardcore: form.hardcore, enableHardcore: form.enableHardcore });
    props.gameSettings.gameSpeed = value;
  };

  const gameRotateChanged = (e: React.ChangeEvent<HTMLInputElement>, { checked }: any) => {
    e.preventDefault();
    setForm({
      gameSpeed: form.gameSpeed,
      rotate: checked,
      hardcore: form.hardcore,
      enableHardcore: form.enableHardcore
    });
    props.gameSettings.rotations = checked;
  };

  const gameHardcoreChanged = (e: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
    e.preventDefault();
    setForm({ gameSpeed: form.gameSpeed, rotate: form.rotate, hardcore: value, enableHardcore: form.enableHardcore });
    props.gameSettings.hardcore = value;
  };

  const gameHardcoreEnabled = (e: React.ChangeEvent<HTMLInputElement>, { checked }: any) => {
    e.preventDefault();
    setForm({
      gameSpeed: form.gameSpeed,
      rotate: form.rotate,
      hardcore: form.hardcore,
      enableHardcore: checked
    });
    if (checked === false) {
      props.gameSettings.hardcore = GameHardcore.NONE;
    }
  };

  const IsMultiRendering = () => {
    const isMulti = props.room.isPrivate;
    if (isMulti === false) {
      return (
        <div style={{ margin: "0px 150px 0px 150px" }}>
          <Grid.Row>
            <Segment>
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                onChange={gameSpeedChanged}
                value="Normal"
                label="Normal"
                name="Normal"
                checked={form.gameSpeed === "Normal"}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                onChange={gameSpeedChanged}
                value="Fast"
                label="Fast"
                name="Fast"
                checked={form.gameSpeed === "Fast"}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                label="Rotations"
                onChange={gameRotateChanged}
                checked={form.rotate}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                value="HardcoreMode"
                label="Enable hardcore mode"
                name="HardcoreMode"
                onChange={gameHardcoreEnabled}
                checked={form.enableHardcore === true}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                onChange={gameHardcoreChanged}
                value="ONE_LINE_ONE_DIE"
                label="One Line One Die"
                name="ONE_LINE_ONE_DIE"
                disabled={form.enableHardcore === false}
                checked={form.hardcore === "ONE_LINE_ONE_DIE" && form.enableHardcore === true}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                onChange={gameHardcoreChanged}
                value="ONE_LIVE_FIVE_LIVES"
                label="One Line Fives Lives"
                name="ONE_LIVE_FIVE_LIVES"
                disabled={form.enableHardcore === false}
                checked={form.hardcore === "ONE_LIVE_FIVE_LIVES" && form.enableHardcore === true}
              />
            </Segment>
          </Grid.Row>
        </div>
      );
    } else {
      return (
        <div style={{ margin: "0px 150px 0px 150px" }}>
          <Grid.Row>
            <Segment>
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                onChange={gameSpeedChanged}
                value="Normal"
                label="Normal"
                name="Normal"
                checked={form.gameSpeed === "Normal"}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                onChange={gameSpeedChanged}
                value="Fast"
                label="Fast"
                name="Fast"
                checked={form.gameSpeed === "Fast"}
              />
              <Checkbox
                style={{ marginRight: "10px" }}
                className="checkboxStyle"
                slider
                label="Rotations"
                onChange={gameRotateChanged}
                checked={form.rotate}
              />
            </Segment>
          </Grid.Row>
        </div>
      );
    }
  };

  return (
    <div>
      <h3 style={{ color: "#31E981", textAlign: "center" }}>
        Choose GameMode:
      </h3>
      <IsMultiRendering />
    </div>
  );
};

export default GameModeCheckBox;
