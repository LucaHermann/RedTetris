import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapterimport from "enzyme-adapter-react-16";
import Modal from "../components/Modal/Modal";

const adapter = ReactSixteenAdapterimport as any;
configure({ adapter: new adapter.default() });

describe("<Modal />", () => {
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
          {
            id: "12",
            userName: "12",
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
        gameOver: true,
        life: 5,
      },
      leaveRoom: jest.fn(),
    };
    wrapper = mount(
      <Modal
        leaveRoomHandler={props.leaveRoomHandler}
        user={props.user}
        room={props.room}
      />
    );
  });

  it("Should set looser to true", () => {
    props.room.isPrivate = true;
    props.user.gameOver = true;
    wrapper = mount(
      <Modal
        leaveRoomHandler={props.leaveRoom}
        user={props.user}
        room={props.room}
      />
    );
    expect(wrapper.find(".ModalLoose"));
  });

  it("Should set winner to true", () => {
    props.user.gameOver = false;
    wrapper = mount(
      <Modal
        leaveRoomHandler={props.leaveRoom}
        user={props.user}
        room={props.room}
      />
    );
    expect(wrapper.find(".ModalWin"));
  });

  it("Should set looser to true", () => {
    props.user.gameOver = true;
    props.room.players.length = 1;
    wrapper = mount(
      <Modal
        leaveRoomHandler={props.leaveRoom}
        user={props.user}
        room={props.room}
      />
    );
    expect(wrapper.find(".ModalLoose"));
  });

  it("Should set winner to true", () => {
    props.user.gameOver = false;
    props.room.players.length = 1;
    wrapper = mount(
      <Modal
        leaveRoomHandler={props.leaveRoom}
        user={props.user}
        room={props.room}
      />
    );
    expect(wrapper.find(".ModalWin"));
  });

  // it("Should increment an i", () => {
  //   props.user.gameOver = true;
  //   props.user.id = "toto";
  //   wrapper = mount(
  //     <Modal
  //       leaveRoomHandler={props.leaveRoom}
  //       user={props.user}
  //       room={props.room}
  //     />
  //   );
  //   expect(wrapper.find(".ModalLoose"));
  // });
});
