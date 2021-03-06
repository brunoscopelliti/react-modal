import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "./";

describe("Modal", () => {
  beforeEach(
    () => {
      const root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
  );

  afterEach(
    () => {
      // eslint-disable-next-line testing-library/no-node-access
      const root = document.getElementById("modal-root");
      if (root) {
        root.remove();
      }
    }
  );

  it("renders the modal hook", () => {
    render(
      <Modal
        renderContent={
          () => {
            return (
              <p>This is the content of the modal.</p>
            );
          }
        }
        renderHook={
          (props) => {
            return (
              <button type="button" {...props}>
                Show modal
              </button>
            );
          }
        }
        rootId="modal-root"
        title="A modal"
      />
    );

    const button = screen.getByText("Show modal");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-haspopup", "dialog");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("permits to open the modal", () => {
    render(
      <Modal
        renderContent={
          () => {
            return (
              <p>This is the content of the modal.</p>
            );
          }
        }
        renderHook={
          (props) => {
            return (
              <button type="button" {...props}>
                Show modal
              </button>
            );
          }
        }
        rootId="modal-root"
        title="A modal"
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    userEvent.click(screen.getByText("Show modal"));

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();

    expect(document.body).toHaveAttribute("class", "ui-modal-open");

    const dialogTitle = screen.getByText("A modal");

    expect(dialog).toHaveAttribute("tabindex", "-1");
    expect(dialog).toHaveAttribute("aria-labelledby", dialogTitle.id);
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("closes the modal when ESC is pressed", () => {
    render(
      <Modal
        renderContent={
          () => {
            return (
              <p>This is the content of the modal.</p>
            );
          }
        }
        renderHook={
          (props) => {
            return (
              <button type="button" {...props}>
                Show modal
              </button>
            );
          }
        }
        rootId="modal-root"
        title="A modal"
      />
    );

    userEvent.click(screen.getByText("Show modal"));

    expect(screen.queryByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { code: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    expect(screen.getByText("Show modal")).toHaveFocus();

    expect(document.body).not.toHaveAttribute("class", "ui-modal-open");
  });

  it("closes the modal when close button is clicked", () => {
    render(
      <Modal
        renderContent={
          () => {
            return (
              <p>This is the content of the modal.</p>
            );
          }
        }
        renderHook={
          (props) => {
            return (
              <button type="button" {...props}>
                Show modal
              </button>
            );
          }
        }
        rootId="modal-root"
        title="A modal"
      />
    );

    userEvent.click(screen.getByText("Show modal"));

    expect(screen.queryByRole("dialog")).toBeInTheDocument();

    userEvent.click(screen.getByLabelText("Close"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    expect(screen.getByText("Show modal")).toHaveFocus();

    expect(document.body).not.toHaveAttribute("class", "ui-modal-open");
  });

  it("closes the modal when footer cancel button is clicked", () => {
    render(
      <Modal
        renderContent={
          () => {
            return (
              <p>This is the content of the modal.</p>
            );
          }
        }
        renderFooter={
          (props) => {
            return (
              <button data-testid="cancel" type="button" onClick={props.close}>Close</button>
            );
          }
        }
        renderHook={
          (props) => {
            return (
              <button type="button" {...props}>
                Show modal
              </button>
            );
          }
        }
        rootId="modal-root"
        title="A modal"
      />
    );

    userEvent.click(screen.getByText("Show modal"));

    expect(screen.queryByRole("dialog")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("cancel"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    expect(screen.getByText("Show modal")).toHaveFocus();

    expect(document.body).not.toHaveAttribute("class", "ui-modal-open");
  });

  it("sets focus on modal when is opened", () => {
    render(
      <Modal
        renderContent={
          () => {
            return (
              <div>
                <p>This is a <a href="#">link</a>.</p>
              </div>
            );
          }
        }
        renderHook={
          (props) => {
            return (
              <button type="button" {...props}>
                Show modal
              </button>
            );
          }
        }
        rootId="modal-root"
        title="A modal"
      />
    );

    userEvent.click(screen.getByText("Show modal"));

    expect(screen.getByRole("dialog")).toHaveFocus();

    userEvent.tab();

    expect(screen.getByLabelText("Close")).toHaveFocus();
  });
});
