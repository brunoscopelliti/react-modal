import React, { useEffect, useRef } from "react";

import { ControlledModal } from "../src";

import Page from "./fixtures/page";

export default {
  title: "ControlledModal",
  component: ControlledModal,
};

const Template = (args) => {
  const ref = useRef();

  useEffect(
    () => {
      console.assert(
        ref.current.getAttribute("role") === "dialog",
        "Wrong ref!"
      );
    }
  );

  return (
    <Page>
      <ControlledModal {...args} ref={ref} />
    </Page>
  );
};

export const AlwaysVisibleModal = Template.bind({});
AlwaysVisibleModal.args = {
  renderContent () {
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
          pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit. <a href="#">
          Nam luctus</a>, enim in interdum condimentum, nisl diam iaculis lorem, vel volutpat
          mi leo sit amet lectus.
        </p>
      </div>
    );
  },
  renderHook (props) {
    return (
      <button type="button" {...props}>Show modal</button>
    );
  },
  rootId: "modal-root",
  title: "Modal title",
};
