import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import useReview from "../hooks/useReview";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const params = useParams();
  if (params.id) {
    console.log(params.id);
    const { data } = useRepository(params.id);
    const reviews = useReview(params.id);
    const reviewNodes = reviews.data
      ? reviews.data.repository.reviews.edges.map(
          (edge: { node: any }) => edge.node
        )
      : [];
    if (data && reviews) {
      return (
        <FlatList
          data={reviews.data ? reviewNodes : []}
          renderItem={({ item }) => (
            <ReviewItem review={item} actions={false} />
          )}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryItem item={data.repository} />}
        />
      );
    }
    return <></>;
  }
  return <></>;
};

export default SingleRepository;
