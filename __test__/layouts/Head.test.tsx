import { render } from "@testing-library/react";

import Head from "@/app/head";

describe("Layout => App => Head", () => {
  beforeEach(() => render(<Head />));

  it("Should have title", () => {
    expect(document.title).toEqual("Books Library");
  });

  it("Should have description", () => {
    expect(
      document
        .querySelector("meta[name='description']")
        ?.getAttribute("content")
    ).toEqual("Books Library is a webapp that lists the books");
  });
});
