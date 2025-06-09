import { View, Image, StyleSheet } from "react-native";
import { Repository } from "../../types";
import Text from "./Text";
import theme from "../theme";

interface Props {
  item: Repository;
}

const styles = StyleSheet.create({
  imageDimensions: {
    flexGrow: 0,
    width: 50,
    height: 50,
    margin: 12,
  },
  flexContainer: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  flexItem: {
    flexGrow: 0,
  },
  flexItemImage: {
    flexGrow: 0,
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flexItemDetails: {
    flexGrow: 0,
    flexDirection: "column",
    display: "flex",
    flexShrink: 1,
  },
  flexItemStats: {
    flexGrow: 0,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  flexItemStatContainer: {
    flexGrow: 1,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  textMarginTopItem: {
    marginTop: 10,
  },
  textMarginItem: {
    margin: 5,
    flexWrap: "wrap",
    alignSelf: "center",
  },
  textBlueBoxItem: {
    padding: 3,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    maxWidth: 500,
  },
});

const RepositoryItem = ({ item }: Props) => {
  //im writing a cursed nested ternary operator that will check if its greater than 1000 and after that it will check if the decimal is 0 then replace it
  let stars =
    item.stargazersCount >= 1000
      ? (item.stargazersCount / 1000).toFixed(1).slice(-1) === "0"
        ? (item.stargazersCount / 1000).toFixed(1).slice(0, -2) + "k"
        : (item.stargazersCount / 1000).toFixed(1) + "k"
      : String(item.stargazersCount);
  let forks =
    item.forksCount >= 1000
      ? (item.forksCount / 1000).toFixed(1).slice(-1) === "0"
        ? (item.forksCount / 1000).toFixed(1).slice(0, -2) + "k"
        : (item.forksCount / 1000).toFixed(1) + "k"
      : String(item.forksCount);
  let reviews =
    item.reviewCount >= 1000
      ? (item.reviewCount / 1000).toFixed(1).slice(-1) === "0"
        ? (item.reviewCount / 1000).toFixed(1).slice(0, -2) + "k"
        : (item.reviewCount / 1000).toFixed(1) + "k"
      : String(item.reviewCount);
  let ratings =
    item.ratingAverage >= 1000
      ? (item.ratingAverage / 1000).toFixed(1).slice(-1) === "0"
        ? (item.ratingAverage / 1000).toFixed(1).slice(0, -2) + "k"
        : (item.ratingAverage / 1000).toFixed(1) + "k"
      : String(item.ratingAverage);

  return (
    <View key={item.id} style={styles.flexContainer}>
      <View style={styles.flexItemImage}>
        <Image
          style={styles.imageDimensions}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.flexItemDetails}>
          <Text
            style={styles.textMarginTopItem}
            fontSize="subheading"
            fontWeight="bold"
          >
            {item.fullName}
          </Text>
          <Text style={styles.textMarginTopItem}>{item.description}</Text>
          <View style={styles.textBlueBoxItem}>
            <Text color="white">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexItemStatContainer}>
        <View style={styles.flexItemStats}>
          <Text fontWeight="bold" style={styles.textMarginItem}>
            {stars}
          </Text>
          <Text style={styles.textMarginItem}>Stars</Text>
        </View>
        <View style={styles.flexItemStats}>
          <Text fontWeight="bold" style={styles.textMarginItem}>
            {forks}
          </Text>
          <Text style={styles.textMarginItem}>Forks</Text>
        </View>
        <View style={styles.flexItemStats}>
          <Text fontWeight="bold" style={styles.textMarginItem}>
            {reviews}
          </Text>
          <Text style={styles.textMarginItem}>Reviews</Text>
        </View>
        <View style={styles.flexItemStats}>
          <Text fontWeight="bold" style={styles.textMarginItem}>
            {ratings}
          </Text>
          <Text style={styles.textMarginItem}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
