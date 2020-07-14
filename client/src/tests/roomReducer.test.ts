import { roomReducer, GameSpeed, GameHardcore } from "../reducers/roomReducer";
import * as roomActions from "../actions/roomActions";

describe("roomReducer", () => {
  const initialState = {
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
            canKeep: true
          },
          linesToAdd: 0,
          gameOver: false,
          life: 5
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
          canKeep: true
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5
      },
      isPrivate: true,
      tetriminosList: [],
      spectrums: []
    },
    error: "",
    gameSettings: {
      gameSpeed: GameSpeed.NORMAL,
      rotations: false,
      hardcore: GameHardcore.NONE,
    },
    gameSettingsDone: false,
  };

  const joiningRoomTest = {
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
          canKeep: true
        },
        linesToAdd: 0,
        gameOver: false,
        life: 5
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
        canKeep: true
      },
      linesToAdd: 0,
      gameOver: false,
      life: 5
    },
    isPrivate: true,
    gameSettingsDone: false,
    tetriminosList: [],
    spectrums: []
  };

  const errorTest = {
    error: "",
  };

  const gameSettingsTest = {
    gameSettings: {
      gameSpeed: GameSpeed.NORMAL,
      rotations: false,
      hardcore: GameHardcore.NONE,
    },
  };

  it("Should test the JOINING_ROOM", async () => {
    expect(
      roomReducer(initialState, {
        type: roomActions.RoomActionType.JOINING_ROOM,
        room: joiningRoomTest,
        error: errorTest.error,
        gameSettings: gameSettingsTest.gameSettings,
      }),
    ).toEqual({
      ...initialState,
      room: joiningRoomTest,
      error: errorTest.error,
      gameSettings: gameSettingsTest.gameSettings,
    });
  });

  it("Should test the REFRESH_ROOM", async () => {
    expect(
      roomReducer(initialState, {
        type: roomActions.RoomActionType.REFRESH_ROOM,
        room: joiningRoomTest,
        error: errorTest.error,
        gameSettings: gameSettingsTest.gameSettings,
      }),
    ).toEqual({
      ...initialState,
      room: joiningRoomTest,
      error: errorTest.error,
      gameSettings: gameSettingsTest.gameSettings,
    });
  });

  it("Should test the GAME_SETTINGS_DONE", async () => {
    expect(
      roomReducer(initialState, {
        type: roomActions.RoomActionType.GAME_SETTINGS_DONE,
        gameSettingsDone: joiningRoomTest.gameSettingsDone,
      }),
    ).toEqual({
      ...initialState,
      gameSettingsDone: joiningRoomTest.gameSettingsDone,
    });
  });

  it("Should test the DEFAULT reducer", () => {
    expect(
      roomReducer(initialState, {
        type: roomActions.RoomActionType.DEFAULT,
      }),
    ).toEqual(initialState);
  });
});
