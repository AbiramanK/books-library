import TestRenderer from "react-test-renderer";

import Head from "@/app/head";

describe("Snapshots", () => {
  it("App <Head /> should render title and description", () => {
    const tree = TestRenderer.create(<Head />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
