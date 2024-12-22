import { describe } from "node:test";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button Components", () => {
  test("renders a default button", () => {
    const { getByText } = render(<Button>Click here</Button>);
    expect(getByText("Click here")).toBeInTheDocument();
  });

  test("disables the button when isDisabled prop is true", () => {
    render(<Button isDisabled={true}>Click here</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("applies the correct css class for diffrent button variants ", () => {
    const { rerender } = render(<Button variant="primary">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");

    rerender(<Button variant="info">Click here</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-info");
  });

  test("show renderd button", () => {
    render(
      <Button variant="primary" isOutline={true} size="large" isDisabled={true}>
        Click here
      </Button>
    );
    screen.debug();
  });
});
