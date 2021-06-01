import React, { useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import cssClass from "@bscop/css-class";

import useDidMount from "@bscop/use-did-mount";
import useForwardRef from "@bscop/use-forward-ref";
import useKeydown from "@bscop/use-keydown";
import useId from "@bscop/use-id";

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

        /* istanbul ignore else */
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
    /**
     * It is not possible to test this with jsdom.
     */
    /* istanbul ignore next */
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

const ControlledModal = React.forwardRef(
  /**
   * @param {import("./index").ControlledModalProps} props
   * @param {React.ForwardedRef<HTMLDivElement>} maybeRef
   */
  (props, maybeRef) => {
    const {
      backdrop = true,
      centered,
      className,
      close,
      fullscreen,
      renderContent,
      renderFooter,
      rootId,
      scrollable,
      title,
    } = props;

    useDidMount(
      () => {
        document.body.classList.add("ui-modal-open");
        return () => {
          document.body.classList.remove("ui-modal-open");
        };
      }
    );

    const refModal = useForwardRef(maybeRef);

    useFocusModal(refModal);

    useFocusTrap(refModal);

    const canBeClosed = typeof close == "function";

    useKeydown(close, { active: canBeClosed, keys: "Escape" });

    const titleId = useId({ length: 4, prefix: "modal-title" });

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
          <div className={
            cssClass("ui-modal-dialog", {
              "ui-centered": centered,
              "ui-fullscreen": fullscreen,
              "ui-scrollable": scrollable,
            })
          }>
            <div className="ui-modal-content">
              <div className="ui-modal-header">
                <h5 className="ui-modal-title" id={titleId}>{title}</h5>
                {
                  canBeClosed && (
                    <button
                      type="button"
                      className="ui-modal-close"
                      aria-label="Close"
                      onClick={close}
                    >
                      ×
                    </button>
                  )
                }
              </div>
              <div className="ui-modal-body">
                {renderContent({ close })}
              </div>
              {
                typeof renderFooter == "function" && (
                  <div className="ui-modal-footer">
                    {renderFooter({ close })}
                  </div>
                )
              }
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

ControlledModal.displayName = "Modal";

ControlledModal.propTypes = {
  backdrop: PropTypes.bool,
  centered: PropTypes.bool,
  className: PropTypes.string,
  close: PropTypes.func,
  fullscreen: PropTypes.bool,
  renderContent: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
  rootId: PropTypes.string.isRequired,
  scrollable: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default ControlledModal;
