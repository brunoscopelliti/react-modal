import React from "react";

import ControlledModal from "../src";

import Page from "./fixtures/page";

export default {
  title: "ControlledModal",
  component: ControlledModal,
};

const Template = (args) => {
  return (
    <Page>
      <ControlledModal {...args} />
    </Page>
  );
};

export const SimpleModal = Template.bind({});
SimpleModal.args = {
  // eslint-disable-next-line react/display-name
  renderHook: (props) => {
    return (
      <button type="button" {...props}>Show modal</button>
    );
  },
  rootId: "modal-root",
  title: "Modal title",
};

export const NoBackdropModal = Template.bind({});
NoBackdropModal.args = {
  backdrop: false,
  // eslint-disable-next-line react/display-name
  renderHook: (props) => {
    return (
      <button type="button" {...props}>Show modal</button>
    );
  },
  rootId: "modal-root",
  title: "Modal title",
};
