import React from "react";
import { configure, mount } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import MusicButton from "../components/Music/MusicHandler";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("<MusicHandler/>", () => {
  let props: any;
  let wrapper: any;
  beforeEach(() => {
    props = {
      music: {
        on: false,
        audio: new Audio(
          "http://f3.quomodo.com/20418264/uploads/686/bandas%20-%20Pena%20Baiona%20(Vino%20griego%20version%20Aviron%20Bayonnais).mp3"
        ),
      },
    };
    wrapper = mount(
      <MusicButton music={props.music} musicOn={props.music.on} />
    );
  });

  it("Should render a button Off", () => {
    props.music.on = false;
    wrapper = mount(
      <MusicButton music={props.music} musicOn={props.music.on} />
    );
    expect(wrapper.find(".ButtonOffDiv"));
  });

  it("Should render a Volume Up", () => {
    props.music.on = true;
    wrapper = mount(
      <MusicButton music={props.music} musicOn={props.music.on} />
    );
    expect(wrapper.find(".VolumeUpDiv"));
  });

  // it("Should simulate a click on volumeUp", () => {
  //   props.music.on = true;
  //   wrapper = mount(
  //     <MusicButton music={props.music} musicOn={props.music.on} />
  //   );
  //   wrapper.find(".ClickVU").simulate("click");
  //   expect(wrapper).toEqual(true);
  // });

  // it("Should simulate a click on volumeOff", () => {
  //   props.music.on = false;
  //   wrapper = mount(
  //     <MusicButton music={props.music} musicOn={props.music.on} />
  //   );
  //   wrapper.find(".ClickBO").simulate("click");
  //   expect(wrapper).toEqual(false);
  // });
});
