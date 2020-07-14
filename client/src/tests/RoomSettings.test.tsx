import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import RoomPage from "../containers/RoomSettings/RoomSettings";

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
      setMusic: false,
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
  },
  refreshSettings: jest.fn(),
  leaveRoom: jest.fn(),
  updateUser: jest.fn(),
};

const mockStore = configureStore([thunk]);
// TODO CONFIGURE STATE OF STORE APPARENTLY
let store;
describe("<RoomPage />", () => {
  store = mockStore(props);
  const wrapper = mount(
    <Provider store={store}>
      <RoomPage />
    </Provider>
  );

  it("nothing to test", () => {
    expect(wrapper.find("CharacterList").length).toEqual(1);
  });
});
