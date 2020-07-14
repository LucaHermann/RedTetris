import React, { useState } from "react";
import { IconGroup, Icon } from "semantic-ui-react";

interface Props {
  music: any;
  musicOn: (music: any) => void;
}

const MusicButton: React.FC<Props> = (props) => {
  const [volume, setvolume] = useState(props.music);

  const handleChange = () => {
    if (!volume.on) {
      setvolume({
        ...volume,
        on: true,
      });
      volume.audio.loop = true;
      volume.audio.play();
    } else {
      setvolume({
        ...volume,
        on: false,
      });
      volume.audio.pause();
    }
    props.musicOn(volume);
  };

  if (!volume.on) {
    return (
      <div className="ButtonOffDiv" style={{ marginBottom: "10px" }}>
        <IconGroup className="ClickBO" onClick={() => handleChange()}>
          <Icon className="volumeOff" />
        </IconGroup>
      </div>
    );
  } else {
    return (
      <div className="VolumeUpDiv" style={{ marginBottom: "10px" }}>
        <IconGroup className="ClickVU" onClick={() => handleChange()}>
          <Icon className="VolumeUp" />
        </IconGroup>
      </div>
    );
  }
};

export default MusicButton;
