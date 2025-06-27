import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { debug } from "@testing-library/react-native/build/helpers/debug";
describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      render(<RepositoryListContainer repositories={{ repositories }} />);
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      for (let i = 0; i < Object.keys(repositories.edges[0].node).length; i++) {
        let valueOne = Object.values(repositories.edges[0].node)[i];
        let valueTwo = Object.values(repositories.edges[1].node)[i];
        if (typeof valueOne === "number" && typeof valueTwo === "number") {
          //for handling number being displayed with formatting
          valueOne =
            valueOne >= 1000
              ? (valueOne / 1000).toFixed(1).slice(-1) === "0"
                ? (valueOne / 1000).toFixed(1).slice(0, -2) + "k"
                : (valueOne / 1000).toFixed(1) + "k"
              : String(valueOne);
          valueTwo =
            valueTwo >= 1000
              ? (valueTwo / 1000).toFixed(1).slice(-1) === "0"
                ? (valueTwo / 1000).toFixed(1).slice(0, -2) + "k"
                : (valueTwo / 1000).toFixed(1) + "k"
              : String(valueTwo);
        }
        if (
          Object.keys(repositories.edges[0].node)[i] !== "ownerAvatarUrl" &&
          Object.keys(repositories.edges[0].node)[i] !== "id"
        ) {
          expect(
            within(firstRepositoryItem).getByText(valueOne.toString())
          ).toBeDefined();
          expect(
            within(secondRepositoryItem).getByText(valueTwo.toString())
          ).toBeDefined();
        }
      }
    });
  });
});
