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
  renderContent () {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
        pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit.
      </p>
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

export const NoBackdropModal = Template.bind({});
NoBackdropModal.args = {
  backdrop: false,
  renderContent () {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
        pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit.
      </p>
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
