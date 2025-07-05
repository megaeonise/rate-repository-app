import useMe from "../hooks/useMe";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const UserReviews = () => {
  const { data, refetch } = useMe(true);
  const reviewNodes = data
    ? data.me.reviews.edges.map((edge: { node: any }) => edge.node)
    : [];
  if (data) {
    console.log(
      reviewNodes[0].id.substring(
        reviewNodes[0].id.indexOf(".") + 1,
        reviewNodes[0].id.length
      )
    );

    return (
      <FlatList
        data={data ? reviewNodes : []}
        renderItem={({ item }) => (
          <ReviewItem review={item} actions={true} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
      />
    );
  }
  return <></>;
};

export default UserReviews;
