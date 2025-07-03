import useMe from "../hooks/useMe";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const UserReviews = () => {
  const { data } = useMe(true);
  console.log(data);
  const reviewNodes = data
    ? data.me.reviews.edges.map((edge: { node: any }) => edge.node)
    : [];
  if (data) {
    return (
      <FlatList
        data={data ? reviewNodes : []}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    );
  }
  return <></>;
};

export default UserReviews;
