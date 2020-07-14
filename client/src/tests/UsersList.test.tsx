import React from "react";
import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import CharacterList from "../components/RoomSettings/UsersList";

// tslint:disable: quotemark

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("<CharacterList />", () => {
  let props: any;
  let wrapper: any;
  beforeEach(() => {
    props = {
      me: {
        id: "1",
        userName: "1",
        roomId: "1",
      },
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
      leaveRoomHandler: jest.fn(),
    };
    wrapper = shallow(<CharacterList {...props} />);
  });

  it("Should render a <List> with playrs in the room", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should leave the room when icon clicked", () => {
    wrapper
      .find('Icon[name="close"]')
      // tslint:disable-next-line: no-empty
      .simulate("click", { preventDefault() {} });
    expect(props.leaveRoomHandler).toBeCalled();
  });
});
