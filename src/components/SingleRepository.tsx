import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import useReview from "../hooks/useReview";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const params = useParams();

  if (params.id) {
    const { data } = useRepository(params.id);
    const reviews = useReview(params.id, 2);
    const reviewNodes = reviews.data
      ? reviews.data.repository.reviews.edges.map(
          (edge: { node: any }) => edge.node
        )
      : [];
    const onEndReach = () => {
      reviews.fetchMore();
    };
    if (data && reviews) {
      return (
        <FlatList
          data={reviews.data ? reviewNodes : []}
          renderItem={({ item }) => (
            <ReviewItem review={item} actions={false} />
          )}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryItem item={data.repository} />}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.2}
        />
      );
    }
    return <></>;
  }
  return <></>;
};

export default SingleRepository;
