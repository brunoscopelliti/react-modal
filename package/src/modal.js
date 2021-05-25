import React, { useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import cssClass from "@bscop/css-class";

import useDidMount from "@bscop/use-did-mount";
import useKeydown from "@bscop/use-keydown";
import useId from "@bscop/use-id";

/**
 * It memorizes the element active at mount time,
 * and set it active again at unmount time.
 * @name useRestoreFocus
 */
const useRestoreFocus =
  () => {
    const ref = useRef(null);

    useDidMount(
      () => {
        ref.current = document.activeElement;

        return () => {
          if (ref.current && document.body.contains(ref.current)) {
            ref.current.focus();
          }
        };
      }
    );
  };

const Modal = React.forwardRef(
  /**
   * @param {import("./index").ModalProps} props
   * @param {React.Ref<HTMLDivElement>} ref
   */
  (props, ref) => {
    const {
      backdrop = true,
      className,
      onClose,
      renderContent,
      rootId,
      title,
    } = props;

    useRestoreFocus();

    /**
     * TODO
     * Trap focus within the modal.
     */

    useKeydown(onClose, { keys: "Escape" });

    const titleId = useId({ length: 3, prefix: "modal-title" });

    /**
     * TODO
     * Render custom footer
     */

    return ReactDOM.createPortal(
      <>
        <div
          ref={ref}
          className={cssClass("ui-modal", className)}
          aria-labelledby={titleId}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div className="ui-modal-dialog">
            <div className="ui-modal-content">
              <div className="ui-modal-header">
                <h5 className="ui-modal-title" id={titleId}>{title}</h5>
                <button
                  type="button"
                  className="ui-modal-close"
                  aria-label="Close"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
              <div className="ui-modal-body">
                {renderContent()}
              </div>
              <div className="ui-modal-footer">
                <button type="button" className="btn btn-secondary">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {
          backdrop && (
            <div className="ui-modal-backdrop" />
          )
        }
      </>,
      document.getElementById(rootId)
    );
  }
);

Modal.displayName = "Modal";

Modal.propTypes = {
  backdrop: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  rootId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
