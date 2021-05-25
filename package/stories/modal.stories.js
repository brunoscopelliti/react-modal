import React, { useEffect, useRef } from "react";

import { Modal } from "../src";

import Page from "./fixtures/page";

export default {
  title: "Modal",
  component: Modal,
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
      <Modal {...args} ref={ref} />
    </Page>
  );
};

export const AlwaysVisibleModal = Template.bind({});
AlwaysVisibleModal.args = {
  // eslint-disable-next-line react/display-name
  renderHook: (props) => {
    return (
      <button type="button" {...props}>Show modal</button>
    );
  },
  rootId: "modal-root",
  title: "Modal title",
};
