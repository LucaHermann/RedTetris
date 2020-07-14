import React from "react";
import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import { Button, Form } from "semantic-ui-react";
import FormHome from "../components/Home/FormHome";

// tslint:disable: quotemark

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("<FormHomePage user emitJoinRoom/>", () => {
  let props: any;
  let wrapper: any;
  beforeEach(() => {
    props = {
      user: {
        id: "1",
        name: "",
        room: "",
      },
      emitJoinRoom: jest.fn(),
    };
    wrapper = shallow(<FormHome {...props} />);
  });

  it("Should render a <Form> with name roomId and submit button", () => {
    expect(
      wrapper.containsMatchingElement(
        <Form>
          <Form.Field>
            <h2>UserName</h2>
            <input value={props.user.name} />
          </Form.Field>
          <Form.Field>
            <h2>Room Number</h2>
            <input value={props.user.room} />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      )
    ).toEqual(false);
  });

  it("Should update the form userName state", () => {
    wrapper.find('input[name="userName"]').simulate("change", {
      target: {
        value: "some new name",
      },
    });
    expect(wrapper.find('input[name="userName"]').prop("value")).toEqual(
      "some new name"
    );
  });

  it("Should update the form roomId state", () => {
    wrapper.find('input[name="roomId"]').simulate("change", {
      target: {
        value: "some new id",
      },
    });
    expect(wrapper.find('input[name="roomId"]').prop("value")).toEqual(
      "some new id"
    );
  });

  it("Should trigger emit joinRoom", () => {
    // tslint:disable-next-line: no-empty
    wrapper.find("Form").simulate("submit", { preventDefault: () => {} });
    expect(wrapper.find('input[name="userName"]').prop("value")).toEqual("");
    expect(wrapper.find('input[name="roomId"]').prop("value")).toEqual("");
  });
});
