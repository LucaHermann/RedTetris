import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import ModeCheckBox from "../components/GameSettings/ModeCheckBox";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";

// tslint:disable: quotemark

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const props = {
  gameSettings: {
    gameSpeed: GameSpeed.NORMAL,
    rotations: true,
    hardcore: GameHardcore.ONE_LINE_FIVE_LIVES,
  },
  room: {
    id: "1",
    inGame: false,
    players: [
      {
        id: "1",
        userName: "1",
        roomId: "1",
        idPiece: 0,
        score: 0,
        lines: 0,
        pieceKeep: {
          piece: "",
          canKeep: true,
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5,
      },
      {
        id: "2",
        userName: "2",
        roomId: "1",
        idPiece: 0,
        score: 0,
        lines: 0,
        pieceKeep: {
          piece: "",
          canKeep: true,
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5,
      },
    ],
    gameMaster: {
      id: "1",
      userName: "1",
      roomId: "1",
      idPiece: 0,
      score: 0,
      lines: 0,
      pieceKeep: {
        piece: "",
        canKeep: true,
      },
      linesToAdd: 0,
      gameOver: false,
      life: 5,
    },
    isPrivate: false,
    tetriminosList: [],
    spectrums: [],
  },
  callBackHandler: jest.fn(),
};
// let wrapper;
describe("<ModeCheckBox />", () => {
  const wrapper = mount(
    <ModeCheckBox
      room={props.room}
      callBackHandler={props.callBackHandler}
      gameSettings={props.gameSettings}
    />
  );

  it("Set gameSettings to Solo", () => {
    wrapper
      .find('Checkbox[name="Solo"]')
      .simulate("change", { target: { value: "Solo" } });
    expect(
      wrapper.find('Checkbox[name="Multiplayer"]').prop("checked")
    ).toEqual(false);
  });

  it("Set gameSettings to Multiplayer", () => {
    wrapper
      .find('Checkbox[name="Multiplayer"]')
      .simulate("change", { target: { value: "Multiplayer" } });
    expect(wrapper.find('Checkbox[name="Solo"]').prop("checked")).toEqual(
      false
    );
  });
});
