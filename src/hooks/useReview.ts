import { useQuery } from "@apollo/client";
import { GET_REVIEW } from "../graphql/queries";

const useReview = (id: string, first: number) => {
  const { data, fetchMore, loading, ...result } = useQuery(GET_REVIEW, {
    fetchPolicy: `cache-and-network`,
    variables: {
      id: id,
      first: first,
    },
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    console.log(canFetchMore);
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        first: first,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReview;
