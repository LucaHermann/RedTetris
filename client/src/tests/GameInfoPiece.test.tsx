import React from "react";
import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import GameInfoPiece, {
  piecesShape,
} from "../components/GameBoard/GameInfoPieces";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("<GameInfoPiece />", () => {
  const expectedSwitchI = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ];

  const expectedSwitchJ = [
    [2, 0, 0, 0],
    [2, 2, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expectedSwitchL = [
    [0, 0, 3, 0],
    [3, 3, 3, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expectedSwitchO = [
    [4, 4, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expectedSwitchS = [
    [0, 5, 5, 0],
    [5, 5, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expectedSwitchT = [
    [0, 6, 0, 0],
    [6, 6, 6, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expectedSwitchZ = [
    [7, 7, 0, 0],
    [0, 7, 7, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expectedSwitchDefault = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  let props: any;
  let wrapper: any;
  beforeEach(() => {
    props = {
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
              piece: "L",
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
            piece: "L",
            canKeep: true,
          },
          linesToAdd: 0,
          gameOver: false,
          life: 5,
        },
        isPrivate: false,
        tetriminosList: ["I", "J", "L", "O", "S", "T", "Z"],
        spectrums: [],
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
      },
    };
    wrapper = shallow(<GameInfoPiece {...props} />);
  });

  it("Should render a NextPieceContainer", () => {
    expect(wrapper.find(".NextPieceContainer"));
  });

  it("Should render a nextPieceGrid", () => {
    expect(wrapper.find(".NextPiece"));
  });

  it("Should render a HoldPieceContainer", () => {
    expect(wrapper.find(".HoldPiece"));
  });

  it("Should test the switch statement for 'I'", () => {
    expect(piecesShape("I")).toEqual(expect.arrayContaining(expectedSwitchI));
  });

  it("Should test the switch statement for 'J'", () => {
    expect(piecesShape("J")).toEqual(expect.arrayContaining(expectedSwitchJ));
  });

  it("Should test the switch statement for 'L'", () => {
    expect(piecesShape("L")).toEqual(expect.arrayContaining(expectedSwitchL));
  });

  it("Should test the switch statement for 'O'", () => {
    expect(piecesShape("O")).toEqual(expect.arrayContaining(expectedSwitchO));
  });

  it("Should test the switch statement for 'S'", () => {
    expect(piecesShape("S")).toEqual(expect.arrayContaining(expectedSwitchS));
  });

  it("Should test the switch statement for 'T'", () => {
    expect(piecesShape("T")).toEqual(expect.arrayContaining(expectedSwitchT));
  });

  it("Should test the switch statement for 'Z'", () => {
    expect(piecesShape("Z")).toEqual(expect.arrayContaining(expectedSwitchZ));
  });

  it("Should test the switch statement for default", () => {
    expect(piecesShape("")).toEqual(
      expect.arrayContaining(expectedSwitchDefault)
    );
  });
});
