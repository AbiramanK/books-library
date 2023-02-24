import TestRenderer from "react-test-renderer";

import Head from "@/app/head";
import { ListSkeleton } from "@/components";

describe("Snapshots", () => {
  describe("Layout => App => <Head />", () => {
    it("should render title and description", () => {
      const tree = TestRenderer.create(<Head />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("Component => <ListSkeliton />", () => {
    it("should render 2 skeletons", () => {
      const tree = TestRenderer.create(<ListSkeleton length={2} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
