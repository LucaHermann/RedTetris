import React from "react";
import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import GameBoard from "../containers/GameBoard/GameBoard";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("<GameBoard />", () => {
  let wrapper: any;
  let props: any;
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
      gameSettings: {
        gameSpeed: GameSpeed.NORMAL,
        rotations: true,
        hardcore: GameHardcore.ONE_LINE_FIVE_LIVES,
      },
      board: {
        grid: Array.from({ length: 20 }, () => Array(10).fill(0)),
        tmpGrid: Array.from({ length: 20 }, () => Array(10).fill(0)),
        currentPiece: {
          tetrimino: "I",
          shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
          ],
          color: "blue",
          width: 3,
          height: 3,
          pos: {
            x: -1,
            y: 1,
          },
          shapeState: 0,
        },
      },
      refreshBoardEmit: jest.fn(),
      refreshRoom: jest.fn(),
      leaveRoomHandler: jest.fn(),
      handleMusica: jest.fn(),
    };
    wrapper = shallow(<GameBoard {...props} />);
  });

  it("Should render a GameContainer", () => {
    expect(wrapper.find(".GameContainer"));
  });

  it("Should render a GameBoard", () => {
    expect(wrapper.find(".GameBoard"));
  });

  it("Should render a GameInfoScore", () => {
    expect(wrapper.find(".GameInfoScore"));
  });
});
