import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import GameModeCheckBox from "../components/GameSettings/GameModeCheckBox";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";

// tslint:disable: quotemark

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const soloRoom = {
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
    },
  ],
  gameMaster: {
    id: "1",
    userName: "1",
    roomId: "1",
    pieceKeep: {
      piece: "",
      canKeep: true,
    },
    linesToAdd: 0,
    gameOver: false,
  },
  isPrivate: true,
  tetriminosList: [],
  spectrums: [],
};

const props = {
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
  error: "",
  gameSettings: {
    gameSpeed: GameSpeed.NORMAL,
    rotations: true,
    hardcore: GameHardcore.NONE,
  },
  gameSettingsDone: false,
  refreshGameSettings: jest.fn(),
};

// let wrapper;
describe("<ModeCheckBox />", () => {
  const wrapper = mount(
    <GameModeCheckBox
      room={props.room}
      refreshGameSettings={props.refreshGameSettings}
      gameSettings={props.gameSettings}
    />
  );
  describe("Game settings for Solo/Multiplayer: Speed and rotations", () => {
    it("Set gameSettings to Fast", () => {
      wrapper
        .find('Checkbox[name="Fast"]')
        .simulate("change", { target: { value: "Fast" } });
      expect(wrapper.find('Checkbox[name="Normal"]').prop("checked")).toEqual(
        false
      );
    });

    it("Set gameSettings to Normal", () => {
      wrapper
        .find('Checkbox[name="Normal"]')
        .simulate("change", { target: { value: "Normal" } });
      expect(wrapper.find('Checkbox[name="Fast"]').prop("checked")).toEqual(
        false
      );
    });

    it("Set gameSettings: Rotation enabled", () => {
      wrapper
        .find('Checkbox[label="Rotations"]')
        .simulate("change", { target: { checked: "true" } });
      expect(props.refreshGameSettings).toHaveBeenCalled();
    });
  });
  describe("Game settings for Multiplayer", () => {
    it("Set gameSettings: Hardcode mode disabled checking checkbox status", () => {
      wrapper.setProps({ room: props.room });
      wrapper
        .find('Checkbox[name="HardcoreMode"]')
        .simulate("change", { target: { checked: false } });
      wrapper
        .find('Checkbox[name="HardcoreMode"]')
        .simulate("change", { target: { checked: false } });
      expect(
        wrapper.find('Checkbox[name="ONE_LINE_ONE_DIE"]').prop("disabled")
      ).toEqual(true);
      expect(
        wrapper.find('Checkbox[name="ONE_LIVE_FIVE_LIVES"]').prop("disabled")
      ).toEqual(true);
    });

    it("Set gameSettings: Hardcode mode enabled checking checkbox status", () => {
      wrapper.setProps({ room: props.room });
      wrapper
        .find('Checkbox[name="HardcoreMode"]')
        .simulate("change", { target: { checked: true } });
      expect(
        wrapper.find('Checkbox[name="ONE_LINE_ONE_DIE"]').prop("checked")
      ).toEqual(false);
      expect(
        wrapper.find('Checkbox[name="ONE_LIVE_FIVE_LIVES"]').prop("checked")
      ).toEqual(false);
    });

    it("Set gameSettings: Hardcode mode to one live one die", () => {
      wrapper.setProps({ room: props.room });
      expect(
        wrapper
          .find('Checkbox[name="ONE_LINE_ONE_DIE"]')
          .simulate("change", { target: { value: "ONE_LIVE_ONE_DIE" } })
      );
      expect(
        wrapper.find('Checkbox[name="ONE_LINE_ONE_DIE"]').prop("checked")
      ).toEqual(true);
      expect(
        wrapper.find('Checkbox[name="ONE_LIVE_FIVE_LIVES"]').prop("checked")
      ).toEqual(false);
    });

    it("Set gameSettings: Hardcode mode to one live five lives", () => {
      wrapper.setProps({ room: props.room });
      expect(
        wrapper
          .find('Checkbox[name="ONE_LIVE_FIVE_LIVES"]')
          .simulate("change", { target: { value: "ONE_LIVE_ONE_DIE" } })
      );
      expect(
        wrapper.find('Checkbox[name="ONE_LINE_ONE_DIE"]').prop("checked")
      ).toEqual(false);
      expect(
        wrapper.find('Checkbox[name="ONE_LIVE_FIVE_LIVES"]').prop("checked")
      ).toEqual(true);
    });
  });
  describe("Game Settings for Solo", () => {
    it("Should not render multiplayer checkboxes", () => {
      wrapper.setProps({ room: soloRoom });
      expect(wrapper.find('Checkbox[name="HardcoreMode"]').length).toEqual(0);
      expect(wrapper.find('Checkbox[name="ONE_LINE_ONE_DIE"]').length).toEqual(
        0
      );
      expect(
        wrapper.find('Checkbox[name="ONE_LIVE_FIVE_LIVES"]').length
      ).toEqual(0);
    });
  });
});
