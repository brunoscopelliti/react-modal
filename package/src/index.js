import React from "react";
import PropTypes from "prop-types";

import useBool from "@bscop/use-bool";

import ControlledModal from "./modal";

const Modal =
  (props) => {
    const { renderHook, ...modalProps } = props;

    const [isOpen, open, close] = useBool();

    return (
      <>
        {
          renderHook({ "aria-haspopup": "dialog", onClick: open })
        }
        {
          isOpen &&
            <ControlledModal {...modalProps} close={close} />
        }
      </>
    );
  };

Modal.propTypes = {
  className: PropTypes.string,
  renderHook: PropTypes.func.isRequired,
  rootId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;

export { ControlledModal };
