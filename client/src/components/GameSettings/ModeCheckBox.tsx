import React, { useState } from "react";
import { Segment, Checkbox } from "semantic-ui-react";

import { IRoom, IGameSettings } from "../../reducers/roomReducer";

interface IProps {
  room: IRoom;
  callBackHandler: any;
  gameSettings: IGameSettings;
}

const ModeCheckBox: React.SFC<IProps> = props => {
  const [form, setForm] = useState({
    mode: "Solo",
  });

  const modeChanged = (e: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
    e.preventDefault();
    setForm({ mode: value });
    props.room.isPrivate = value === "Solo" ? true : false;
    props.callBackHandler({ room: props.room, gameSettings: props.gameSettings });
  };

  return (
    <div className="ModeCheckBox">
      <h3 style={{ color: "#31E981", textAlign: "center" }}>
        Choose Mode:
      </h3>
      <div>
        <Segment stacked>
          <Checkbox
            style={{ marginRight: "10px" }}
            className="checkboxStyle"
            slider
            value="Solo"
            label="Solo"
            name="Solo"
            checked={form.mode === "Solo"}
            onChange={modeChanged}
          />
          <Checkbox
            style={{ marginRight: "10px" }}
            className="checkboxStyle"
            slider
            value="Multiplayer"
            label="Multiplayer"
            name="Multiplayer"
            onChange={modeChanged}
            checked={form.mode === "Multiplayer"}
          />
        </Segment>
      </div>
    </div>
  );
};

export default ModeCheckBox;
