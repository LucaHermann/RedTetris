import React from "react";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import GameInfoScore from "../components/GameBoard/GameInfoScore";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const props = {
  gameSettings: {
    gameSpeed: GameSpeed.NORMAL,
    rotations: true,
    hardcore: GameHardcore.ONE_LINE_FIVE_LIVES,
  },
  user: {
    id: "1",
    roomId: "1",
    userName: "1",
    idPiece: 0,
    pieceKeep: {
      piece: "L",
      canKeep: true,
    },
    linesToAdd: 0,
    gameOver: false,
    life: 5,
    score: 100,
  },
};

describe("<GameInfoScore />", () => {
  const wrapper = mount(
    <GameInfoScore gameSettings={props.gameSettings} user={props.user} />
  );
  it("Should render a GameInfoScoreContainer", () => {
    expect(wrapper.find(".GameInfoScoreContainer"));
  });
});
