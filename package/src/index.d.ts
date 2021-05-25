import React from "react";

export type ModalProps = {
  /**
   * Determines whether the backdrop should
   * be rendered, or not.
   */
  backdrop ?: boolean;
  className ?: string;
  /**
   * Executed when user clicks on cross icon,
   * or press enter key.
   */
  onClose : () => void;
  renderContent : () => React.ReactNode;
  /**
   * Id of the DOM element containing the modal.
   */
  rootId : string;
  /**
   * The title render in the header of the modal.
   */
  title : string;
}

declare const Modal: React.FC<ModalProps>;

export { Modal };

type HookProps = {
  onClick : (event : React.MouseEvent) => void;
}

export type ControlledModalProps = Omit<ModalProps, "onClose"> & {
  renderHook : (hookProps: HookProps) => React.ReactNode
};

declare const ControlledModal: React.FC<ControlledModalProps>;

export default ControlledModal;
