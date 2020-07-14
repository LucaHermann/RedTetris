import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { GameSpeed, GameHardcore } from "../reducers/roomReducer";
import FinalRoom from "../containers/FinalRoom/FinalRoom";
import { createMemoryHistory, createLocation } from "history";
import { match } from "react-router";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const props = {
  userState: {
    user: {
      id: "1",
      userName: "1",
      roomId: "1",
    },
    roomSettings: {
      setMusic: true,
      setEffect: false,
      setSpectrum: false,
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
    gameSettingsDone: false,
  },
  refreshRoom: jest.fn(),
  leaveRoom: jest.fn(),
  updateUser: jest.fn(),
  refreshGameSettings: jest.fn(),
  updateGameSettingsDone: jest.fn(),
};

const history = createMemoryHistory();
const path = `/1[1]`;

// eslint-disable-next-line no-redeclare
const match: match<{ id: string }> = {
  isExact: false,
  path,
  url: path.replace(":id", "1"),
  params: { id: "1" },
};

const mockStore = configureMockStore([thunk]);
// TODO CONFIGURE STATE OF STORE APPARENTLY
describe("<FinalRoomPage />", () => {
  const location = createLocation(match.url);

  let store = mockStore(props);

  describe("Without gameSettings done, not rendering roomPage", () => {
    const wrapper = mount(
      <Provider store={store}>
        <FinalRoom history={history} match={match} location={location} />
      </Provider>
    );
    expect(wrapper.find("RoomPage").length).toEqual(0);
    expect(wrapper.find("GameSettings").length).toEqual(1);
  });

  describe("With gameSettingsDone not rendering GameSettings", () => {
    props.roomState.gameSettingsDone = true;

    it("Should not render gameSetting page", () => {
      const wrapper = mount(
        <Provider store={store}>
          <FinalRoom history={history} match={match} location={location} />
        </Provider>
      );
      expect(wrapper.find("RoomPage").length).toEqual(1);
      expect(wrapper.find("GameSettings").length).toEqual(0);
    });
  });

  describe("mount without room id but in roompage", () => {
    props.userState.user.roomId = "";
    it("should redirect to '/'", () => {
      store = mockStore(props);
      const wrapper = mount(
        <Provider store={store}>
          <FinalRoom history={history} match={match} location={location} />
        </Provider>
      );
      wrapper.update();
      expect(history.action).toEqual("PUSH");
      expect(history.location.pathname).toEqual("/");
    });
  });
});
