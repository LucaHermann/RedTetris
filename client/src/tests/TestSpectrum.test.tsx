import React from "react";
import { configure, shallow } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import TestSpectrum from "../components/GameBoard/testSpectrum";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("<TestSpectrum />", () => {
  let props: any;
  let wrapper: any;
  beforeEach(() => {
    props = {
      spectrum: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 9, 0, 0],
      ],
    };
    wrapper = shallow(<TestSpectrum {...props} />);
  });

  it("Should render a Grid", () => {
    expect(wrapper.find(".Grid"));
  });

  it("Should render a Line", () => {
    expect(wrapper.find(".Line"));
  });

  it("Should render a Case", () => {
    expect(wrapper.find(".Case"));
  });
});
