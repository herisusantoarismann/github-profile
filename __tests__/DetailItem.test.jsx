// DetailItem.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailItem from "../src/components/Profile/DetailItem";

describe("DetailItem Component", () => {
  test("renders correctly with given data", () => {
    const data = {
      label: "Label",
      value: "Value",
    };

    render(<DetailItem data={data} />);

    // Check if the label and value are rendered correctly
    const labelElement = screen.getByTestId("detailItem-label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("text-[#4A5567]");

    const valueElement = screen.getByTestId("detailItem-value");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass("text-[#CDD5E0]");
  });

  test("renders with missing label", () => {
    const data = {
      label: "",
      value: "Value",
    };

    render(<DetailItem data={data} />);

    // Check if the value is rendered correctly
    const valueElement = screen.getByTestId("detailItem-value");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass("text-[#CDD5E0]");
  });

  test("renders with missing value", () => {
    const data = {
      label: "Label",
      value: "",
    };

    render(<DetailItem data={data} />);

    // Check if the label is rendered correctly
    const labelElement = screen.getByTestId("detailItem-label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("text-[#4A5567]");
  });

  test("renders with missing both label and value", () => {
    const data = {
      label: "",
      value: "",
    };

    render(<DetailItem data={data} />);

    const labelElement = screen.getByTestId("detailItem-label");
    const valueElement = screen.getByTestId("detailItem-value");
    expect(labelElement).toBeEmptyDOMElement();
    expect(valueElement).toBeEmptyDOMElement();
  });

  test("renders with null data", () => {
    const data = null;

    const { container } = render(<DetailItem data={data} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders with undefined data", () => {
    const data = undefined;

    const { container } = render(<DetailItem data={data} />);
    expect(container).toBeEmptyDOMElement();
  });
});
