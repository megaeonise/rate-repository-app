import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import useReview from "../hooks/useReview";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";


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
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "white"
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
    marginHorizontal: 5
  },
  textWithMargin: {
    marginLeft: 5,
    marginRight: 100,
    flexWrap: "wrap",
  }
});



const ReviewItem = ({ review }: any) => {
  const reviewDate = `${review.createdAt.slice(8,10)}.${review.createdAt.slice(5,7)}.${review.createdAt.slice(0,4)}`
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
      <Text style={styles.textWithMargin}>
        {review.text}
      </Text>
    </View>
  </View>
  )
};

const SingleRepository = () => {
  const params = useParams();
  if (params.id) {
    const { data } = useRepository(params.id);
    const reviews = useReview(params.id);
    const reviewNodes = reviews.data
    ? reviews.data.repository.reviews.edges.map((edge: { node: any }) => edge.node)
    : [];
    if (data && reviews) {
      return (
      <FlatList 
      data={reviews.data ? reviewNodes : []}
      renderItem={({ item }) => <ReviewItem review={item} />} 
      keyExtractor={({id}) => id}
      ListHeaderComponent={()=><RepositoryItem item={data.repository} />}
      />)
       ;
    }
    return <></>;
  }
  return <></>;
};

export default SingleRepository;
