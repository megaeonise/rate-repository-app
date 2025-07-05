import { Pressable, StyleSheet, View, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  rowFlexContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "white",
    marginTop: 15,
  },
  columnFlexContainer: {
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "white",
    flexGrow: 1,
  },
  totalContainer: {
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "white",
    flexGrow: 1,
    marginBottom: 10,
  },
  rating: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 3,
  },
  textWithMargin: {
    marginLeft: 5,
    marginRight: 100,
    flexWrap: "wrap",
  },
  textBlueBoxButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    marginHorizontal: 15,
    marginBottom: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
  },
  textRedBoxButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    marginHorizontal: 15,
    marginBottom: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.red,
    alignSelf: "flex-end",
  },
});

const ReviewItem = ({ review, actions, refetch }: any) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  const reviewDate = `${review.createdAt.slice(8, 10)}.${review.createdAt.slice(
    5,
    7
  )}.${review.createdAt.slice(0, 4)}`;
  const onPressView = () => {
    navigate(
      `/${review.id.substring(review.id.indexOf(".") + 1, review.id.length)}`
    );
  };
  const onPressDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log(review.id),
        },
        {
          text: "Delete",
          onPress: () => deleteReview(review.id),
        },
      ]
    );
    refetch();
  };
  if (actions) {
    return (
      <View style={styles.totalContainer}>
        <View style={styles.rowFlexContainer}>
          <View style={styles.rating}>
            <Text color="primary" fontWeight="bold">
              {review.rating}
            </Text>
          </View>
          <View style={styles.columnFlexContainer}>
            <Text fontWeight="bold" style={styles.textWithMargin}>
              {review.user.username}
            </Text>
            <Text style={styles.textWithMargin} color="textSecondary">
              {reviewDate}
            </Text>
            <Text style={styles.textWithMargin}>{review.text}</Text>
          </View>
        </View>
        <View style={styles.rowFlexContainer}>
          <Pressable style={styles.textBlueBoxButton} onPress={onPressView}>
            <Text color="white">View repository</Text>
          </Pressable>
          <Pressable style={styles.textRedBoxButton} onPress={onPressDelete}>
            <Text color="white">Delete review</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.rowFlexContainer}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.columnFlexContainer}>
        <Text fontWeight="bold" style={styles.textWithMargin}>
          {review.user.username}
        </Text>
        <Text style={styles.textWithMargin} color="textSecondary">
          {reviewDate}
        </Text>
        <Text style={styles.textWithMargin}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
