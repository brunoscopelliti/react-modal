import React from "react";
import PropTypes from "prop-types";

import useBool from "@bscop/use-bool";

import Modal from "./modal";

const ControlledModal =
  (props) => {
    const { renderHook, ...modalProps } = props;

    const [isOpen, open, close] = useBool();

    return (
      <>
        {
          renderHook({ onClick: open })
        }
        {
          isOpen &&
            <Modal {...modalProps} close={close} />
        }
      </>
    );
  };

ControlledModal.propTypes = {
  className: PropTypes.string,
  renderHook: PropTypes.func.isRequired,
  rootId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ControlledModal;

export { Modal };
