import React from "react";

import ControlledModal from "../src";

import Page from "./fixtures/page";
import Form from "./fixtures/form";
import Paragraphs from "./fixtures/paragraphs";

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
  centered: false,
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

export const CustomFooterModal = Template.bind({});
CustomFooterModal.args = {
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
  renderFooter (props) {
    return (
      // eslint-disable-next-line react/prop-types
      <button type="button" onClick={props.close}>Cancel</button>
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

export const FormModal = Template.bind({});
FormModal.args = {
  renderContent (props) {
    return (
      <Form {...props} />
    );
  },
  renderHook (props) {
    return (
      <button type="button" {...props}>Show modal</button>
    );
  },
  rootId: "modal-root",
  scrollable: false,
  title: "Modal title",
};

export const ScrollableContentModal = Template.bind({});
ScrollableContentModal.args = {
  renderContent () {
    return (
      <div>
        <Paragraphs />
      </div>
    );
  },
  renderHook (props) {
    return (
      <button type="button" {...props}>Show modal</button>
    );
  },
  rootId: "modal-root",
  scrollable: true,
  title: "Modal title",
};

export const VerticallyCenteredModal = Template.bind({});
VerticallyCenteredModal.args = {
  centered: true,
  renderContent () {
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
          pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit.
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

export const FullScreenModal = Template.bind({});
FullScreenModal.args = {
  fullscreen: true,
  renderContent () {
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, tortor nec
          pharetra ultricies, ante erat imperdiet velit, nec laoreet enim lacus a velit.
        </p>
      </div>
    );
  },
  renderFooter (props) {
    return (
      // eslint-disable-next-line react/prop-types
      <button type="button" onClick={props.close}>Close</button>
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

const cssFade = `.ui-modal.ui-fade-modal {
  opacity: 0;
  transition: opacity .5s linear;
}

body.ui-modal-open {
  .ui-modal {
    opacity: 1;
  }
}`;
export const FadingModal = Template.bind({});
FadingModal.args = {
  className: "ui-fade-modal",
  renderContent () {
    return (
      <div>
        <p>
          This needs some confiuration;
          <br/>Add <code>ui-fade-modal</code> class to the modal component, and add the following CSS, or whatever effect you prefer.
        </p>
        <pre>
          <code>
            {cssFade}
          </code>
        </pre>
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
