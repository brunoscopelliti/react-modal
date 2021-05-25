import React, { useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import cssClass from "@bscop/css-class";

import useDidMount from "@bscop/use-did-mount";
import useKeydown from "@bscop/use-keydown";
import useId from "@bscop/use-id";

/**
 * @name useMaybeRef
 */
const useMaybeRef = (refOrUndefined) => {
  const ref = useRef();

  return refOrUndefined || ref;
};

/**
 * It memorizes the element active at mount time,
 * and set focus on the modal element.
 * Once the modal gets unmounted it set focus on
 * the element that was initially active.
 * @name useFocusModal
 * @param {React.RefObject<HTMLDivElement>} refModal
 */
const useFocusModal =
  (refModal) => {
    const ref = useRef(null);

    useDidMount(
      () => {
        ref.current = document.activeElement;

        if (refModal.current) {
          refModal.current.focus();
        }

        return () => {
          if (ref.current && document.body.contains(ref.current)) {
            ref.current.focus();
          }
        };
      }
    );
  };

/**
 * Prevent the focus to leave the modal element.
 * @name useFocusTrap
 * @param {React.RefObject<HTMLDivElement>} refModal
 */
const useFocusTrap =
  (refModal) => {
    const onKeyDown =
      (event) => {
        if (event.code === "Tab") {
          const focusableElements = refModal.current.querySelectorAll(
            "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type='text']:not([disabled]), input[type='radio']:not([disabled]), input[type='checkbox']:not([disabled]), select:not([disabled])"
          );

          const firstFocusableElement = focusableElements[0];
          const lastFocusableElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              // @ts-ignore
              lastFocusableElement.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              // @ts-ignore
              firstFocusableElement.focus();
              event.preventDefault();
            }
          }
        }
      };

    useDidMount(
      () => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
          document.removeEventListener("keydown", onKeyDown);
        };
      }
    );
  };

const Modal = React.forwardRef(
  /**
   * @param {import("./index").ModalProps} props
   * @param {React.ForwardedRef<HTMLDivElement>} maybeRef
   */
  (props, maybeRef) => {
    const {
      backdrop = true,
      className,
      onClose,
      renderContent,
      rootId,
      title,
    } = props;

    const refModal = useMaybeRef(maybeRef);

    useFocusModal(refModal);

    useFocusTrap(refModal);

    useKeydown(onClose, { keys: "Escape" });

    const titleId = useId({ length: 3, prefix: "modal-title" });

    /**
     * TODO
     * Render custom footer
     */

    return ReactDOM.createPortal(
      <>
        <div
          ref={refModal}
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
                {/* <button type="button" className="btn btn-secondary">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button> */}
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
