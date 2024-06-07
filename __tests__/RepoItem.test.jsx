import { render, screen } from "@testing-library/react";
import { RepoItem } from "../src/components";
import React from "react";
import moment from "moment";

describe("RepoItem Component", () => {
  const mockData = {
    html_url: "https://github.com/example",
    name: "Example Repo",
    description: "This is an example repository",
    license: "MIT",
    forks: 10,
    stargazers_count: 100,
    updated_at: moment().toISOString(),
  };

  test("renders correctly with given data", () => {
    render(<RepoItem data={mockData} />);

    // Check if the name and description are rendered correctly
    expect(screen.getByText("Example Repo")).toBeInTheDocument();
    expect(
      screen.getByText("This is an example repository")
    ).toBeInTheDocument();

    // Check if the license, forks, and stargazers count are rendered correctly
    expect(screen.getByText("MIT")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();

    // Check if the updated time is rendered correctly
    expect(screen.getByText("updated a few seconds ago")).toBeInTheDocument();
  });

  test("renders nothing if data is missing", () => {
    render(<RepoItem data={null} />);

    // Check if the component renders nothing when data is null
    expect(screen.queryByText("Example Repo")).not.toBeInTheDocument();
    expect(
      screen.queryByText("This is an example repository")
    ).not.toBeInTheDocument();
  });

  test("renders without license if license data is missing", () => {
    const dataWithoutLicense = { ...mockData, license: null };
    render(<RepoItem data={dataWithoutLicense} />);

    // Check if the license is not rendered when license data is missing
    expect(screen.queryByText("MIT")).not.toBeInTheDocument();
  });

  test("renders without updated time if updated_at data is missing", () => {
    const dataWithoutUpdatedAt = { ...mockData, updated_at: null };
    render(<RepoItem data={dataWithoutUpdatedAt} />);

    // Check if the updated time is not rendered when updated_at data is missing
    expect(screen.queryByText("updated")).not.toBeInTheDocument();
  });

  test("renders link with correct href", () => {
    render(<RepoItem data={mockData} />);

    // Check if the link href attribute points to the correct URL
    const linkElement = screen.getByTestId("repoItem-link");
    expect(linkElement).toHaveAttribute("href", "https://github.com/example");
  });
});
