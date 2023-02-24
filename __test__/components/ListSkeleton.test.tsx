import { render, screen } from "@testing-library/react";

import { ListSkeleton } from "@/components";

describe("Component => ListSkeleton", () => {
  it("Should render 0 skeleton", () => {
    runListSkeletonTest(0);
  });

  it("Should render 1 skeleton", () => {
    runListSkeletonTest(1);
  });

  it("Should render 4 skeletons", () => {
    runListSkeletonTest(4);
  });
});

function runListSkeletonTest(length: number) {
  render(<ListSkeleton length={length} />);

  expect(screen.getByRole("list")).toBeInTheDocument();
  if (length > 0) {
    expect(screen.getAllByRole("listitem")).toHaveLength(length);
  } else {
    expect(screen.getByRole("list").childElementCount).toEqual(0);
  }
}
