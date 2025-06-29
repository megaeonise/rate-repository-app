import { useQuery } from "@apollo/client";
import { GET_REVIEW } from "../graphql/queries";

const useReview = (id: string) => {
    console.log(id, "in review")
  const { data, error, loading } = useQuery(GET_REVIEW, {
    fetchPolicy: `cache-and-network`,
    variables: {
      id: id,
    },
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useReview;
