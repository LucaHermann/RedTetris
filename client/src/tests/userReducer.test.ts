import { userReducer } from "../reducers/userReducers";
import * as userActions from "../actions/userActions";

describe("userReducer", () => {
  const initialState = {
    user: {
      id: "",
      userName: "",
      roomId: "",
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
    music: {
      on: false,
      audio: new Audio(
        "http://f3.quomodo.com/20418264/uploads/686/bandas%20-%20Pena%20Baiona%20(Vino%20griego%20version%20Aviron%20Bayonnais).mp3"
      ),
    },
    roomSettings: {
      setEffect: false,
      setSpectrum: false,
    },
    board: {
      grid: Array.from({ length: 20 }, () => Array(10).fill(0)),
      tmpGrid: Array.from({ length: 20 }, () => Array(10).fill(0)),
      currentPiece: {
        shape: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        color: "",
        width: 0,
        height: 0,
        pos: { x: 0, y: 0 },
        tetrimino: "",
        shapeState: 0,
      },
    },
  };

  const playerTest = {
    id: "testId",
    userName: "testName",
    roomId: "roomTest",
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
  };

  const createPlayerTest = {
    id: "testId",
    userName: "",
    roomId: "",
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
  };

  const newRoomSettings = {
    setEffect: false,
    setSpectrum: true,
  };

  // const boardTest = {
  //   board: {
  //     grid: Array.from({ length: 20 }, () => Array(10).fill(0)),
  //     tmpGrid: Array.from({ length: 20 }, () => Array(10).fill(0)),
  //     currentPiece: {
  //       tetrimino: "I",
  //       shape: [
  //         [0, 1, 0, 0],
  //         [0, 1, 0, 0],
  //         [0, 1, 0, 0],
  //         [0, 1, 0, 0],
  //       ],
  //       color: "blue",
  //       width: 3,
  //       height: 3,
  //       pos: {
  //         x: -1,
  //         y: 1,
  //       },
  //       shapeState: 0,
  //     },
  //   },
  // };

  // const musicTest = {
  //   music: {
  //     on: false,
  //     audio: new Audio(
  //       "http://f3.quomodo.com/20418264/uploads/686/bandas%20-%20Pena%20Baiona%20(Vino%20griego%20version%20Aviron%20Bayonnais).mp3"
  //     ),
  //   },
  // };

  it("Should test the id after we created the player", async () => {
    expect(
      userReducer(initialState, {
        type: userActions.UserActionType.CREATE_USER,
        user: createPlayerTest,
      })
    ).toEqual({
      ...initialState,
      user: createPlayerTest,
    });
  });

  it("Should test the user after we updated it", async () => {
    expect(
      userReducer(initialState, {
        type: userActions.UserActionType.UPDATE_USER,
        user: playerTest,
      })
    ).toEqual({
      ...initialState,
      user: playerTest,
    });
  });

  it("Should test the room settings after they changed", async () => {
    expect(
      userReducer(initialState, {
        type: userActions.UserActionType.REFRESH_ROOM_SETTINGS,
        roomSettings: newRoomSettings,
      })
    ).toEqual({
      ...initialState,
      roomSettings: newRoomSettings,
    });
  });

  // it("Should test the Board reducer", async () => {
  //   expect(
  //     userReducer(initialState, {
  //       type: userActions.UserActionType.BOARD,
  //       board: boardTest,
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     board: boardTest,
  //   });
  // });

  // it("Should test the Malus reducer", async () => {
  //   expect(
  //     userReducer(initialState, {
  //       type: userActions.UserActionType.MALUS,
  //       user: playerTest,
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     user: playerTest,
  //   });
  // });

  // it("Should test the music reducer", async () => {
  //   expect(
  //     userReducer(initialState, {
  //       type: userActions.UserActionType.MUSIC,
  //       music: musicTest,
  //     })
  //   ).toEqual(
  //     ...initialState,
  //     music: musicTest
  //   );
  // });

  it("should test the DEFAULT reducer", () => {
    expect(
      userReducer(initialState, {
        type: userActions.UserActionType.DEFAULT,
      })
    ).toEqual(initialState);
  });
});
