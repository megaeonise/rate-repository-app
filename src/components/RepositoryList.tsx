import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { NavigateFunction, useNavigate } from "react-router-native";
import { useState } from "react";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  greyText: {
    color: "grey",
  },
  blackText: {
    color: theme.colors.textPrimary,
  },
});

const repositoriesOffline = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
  },
  {
    id: "django.django",
    fullName: "django/django",
    description: "The Web framework for perfectionists with deadlines.",
    language: "Python",
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
  },
  {
    id: "reduxjs.redux",
    fullName: "reduxjs/redux",
    description: "Predictable state container for JavaScript apps",
    language: "TypeScript",
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

interface Props {
  repositories: { repositories: { edges: { node: any }[] } };
  navigate: NavigateFunction;
  sortRepository: () => React.JSX.Element;
}

export const RepositoryListContainer = ({
  repositories,
  navigate,
  sortRepository,
}: Props) => {
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map((edge: { node: any }) => edge.node)
    : [];

  return (
    <FlatList
      data={repositories ? repositoryNodes : []}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem item={item} navigate={navigate} />
      )}
      ListHeaderComponent={sortRepository}
      // other props
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState(0);
  const sortArray = [
    ["CREATED_AT", "DESC"],
    ["RATING_AVERAGE", "DESC"],
    ["RATING_AVERAGE", "ASC"],
  ];
  const { data } = useRepositories({
    orderBy: sortArray[sort][0],
    orderDirection: sortArray[sort][1],
  });
  const navigate = useNavigate();

  const sortRepository = () => {
    return (
      <Picker
        selectedValue={sort}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue !== 3) {
            setSort(itemValue);
          }
        }}
      >
        <Picker.Item
          style={styles.greyText}
          label="Select an item..."
          value={3}
        />
        <Picker.Item
          style={styles.blackText}
          label="Latest repositories"
          value={0}
        />
        <Picker.Item
          style={styles.blackText}
          label="Highest rated repositories"
          value={1}
        />
        <Picker.Item
          style={styles.blackText}
          label="Lowest rated repositories"
          value={2}
        />
      </Picker>
    );
  };

  console.log(data);
  return (
    <RepositoryListContainer
      repositories={data}
      navigate={navigate}
      sortRepository={sortRepository}
    />
  );
};

export default RepositoryList;
