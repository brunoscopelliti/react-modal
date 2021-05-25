import React from "react";
import { render, screen } from "@testing-library/react";
import ControlledModal from "./";

describe("ControlledModal", () => {
  it("renders the modal hook", () => {
    render(
      <ControlledModal
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

    expect(screen.getByText("Show modal")).toBeInTheDocument();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
