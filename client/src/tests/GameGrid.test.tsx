import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import GameGrid from "../components/GameBoard/GameGrid";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const props = {
  board: {
    grid: Array.from({ length: 20 }, () => Array(10).fill(0)),
    tmpGrid: Array.from({ length: 20 }, () => Array(10).fill(0)),
    currentPiece: {
      tetrimino: "I",
      shape: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      color: "blue",
      width: 3,
      height: 3,
      pos: {
        x: -1,
        y: 1,
      },
      shapeState: 0,
    },
  },
};

describe("<Grid />", () => {
  props.board.tmpGrid[0][0] = 10;
  props.board.tmpGrid[0][1] = -1;
  props.board.tmpGrid[0][2] = 7;
  const wrapper = mount(<GameGrid board={props.board} />);

  it("Should create an grid", () => {
    expect(wrapper.find(".Grid")).toHaveLength(1);
  });

  it("Should create a grid with 20 lines", () => {
    expect(wrapper.find(".Line")).toHaveLength(20);
  });

  it("Should create an grid with 200 cases", () => {
    expect(wrapper.find(".Case")).toHaveLength(200);
  });
});
