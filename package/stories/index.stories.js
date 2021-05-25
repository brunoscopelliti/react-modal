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
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
          pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit. <a href="#">
          Nam luctus</a>, enim in interdum condimentum, nisl diam iaculis lorem, vel volutpat
          mi leo sit amet lectus.
        </p>
        <p>
          Phasellus ac tristique orci. Nulla maximus <a href="#">justo nec dignissim consequat</a>.
          Sed vehicula diam sit amet mi efficitur vehicula in in nisl. Aliquam erat volutpat.
          Suspendisse lorem turpis, accumsan consequat consectetur gravida, <a href="#">pellentesque
          ac ante</a>. Aliquam in commodo ligula, sit amet mollis neque. Vestibulum at facilisis massa.
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
