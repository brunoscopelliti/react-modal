import React from "react";

type RenderProps = {
  close : () => void;
};

export type ModalProps = {
  /**
   * Determines whether the backdrop should
   * be rendered, or not.
   */
  backdrop ?: boolean;
  className ?: string;
  /**
   * Determine whether the modal
   * is vertically centered.
   */
  centered ?: boolean;
  /**
   * Executed when user closes the modal,
   * eg.clicks on cross icon, or press escape key.
   */
  close ?: () => void;
  /**
   * Determine whether the modal
   * should occupy all available space.
   */
  fullscreen ?: boolean;
  renderContent : (props : RenderProps) => React.ReactNode;
  renderFooter ?: (props : RenderProps) => React.ReactNode;
  /**
   * Id of the DOM element containing the modal.
   */
  rootId : string;
  /**
   * Determine whether the modal content
   * is allowed to be scrollable.
   */
  scrollable ?: boolean;
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

export type ControlledModalProps = Omit<ModalProps, "close"> & {
  renderHook : (hookProps: HookProps) => React.ReactNode
};

declare const ControlledModal: React.FC<ControlledModalProps>;

export default ControlledModal;
