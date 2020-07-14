import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import GameSpectrum from "../components/GameBoard/GameSpectrum";
import { IRoom, IUser } from "./mocks/mockServer/SocketEvent";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

interface IProps {
  room: IRoom;
  user: IUser;
}

describe("<GameSpectrum />", () => {
  let wrapper: any;
  const players1: any = [
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
  ];
  let props: IProps;
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
          {
            id: "2",
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
        spectrums: [
          {
            id: "1",
            userName: "1",
            score: 100,
            spectrum: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
          },
        ],
      },
      user: {
        id: "100",
        roomId: "1",
        userName: "1",
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
    };
    wrapper = mount(<GameSpectrum user={props.user} room={props.room} />);
  });

  it("Should render a Spectrum Container", () => {
    expect(wrapper.find(".SpectrumContainer"));
  });

  it("Should not render a Spectrum Container", () => {
    props.user.id = "1";
    props.room.players = players1;
    wrapper = mount(<GameSpectrum user={props.user} room={props.room} />);
    expect(wrapper.find(".SpectrumContainer"));
  });
});
