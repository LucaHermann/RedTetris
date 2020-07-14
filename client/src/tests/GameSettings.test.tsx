import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";
import GameSettings from "../containers/GameSettings/GameSettings";

// tslint:disable: quotemark

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const props = {
  userState: {
    user: {
      id: "1",
      userName: "1",
      roomId: "1",
    },
  },
  roomState: {
    room: {
      id: "1",
      inGame: false,
      players: [
        {
          id: "1",
          userName: "1",
          roomId: "1",
        },
        {
          id: "2",
          userName: "2",
          roomId: "1",
        },
      ],
      gameMaster: {
        id: "1",
        userName: "1",
        roomId: "1",
      },
      isPrivate: false,
    },
    gameSettings: {
      gameSpeed: GameSpeed.NORMAL,
      rotations: true,
      hardcore: GameHardcore.ONE_LINE_FIVE_LIVES,
    },
  },
  refreshGameSettings: jest.fn(),
  gameSettingsDone: jest.fn(),
};

const mockStore = configureStore([thunk]);

let store;
describe("<RoomPage />", () => {
  store = mockStore(props);
  const wrapper = mount(
    <Provider store={store}>
      <GameSettings />
    </Provider>
  );

  it("Test click on button for game settings Done", () => {
    wrapper
      .find('Button[name="gameSettingsDone"]')
      // tslint:disable-next-line: no-empty
      .simulate("click", { preventDefault: () => {} });
  });
});
