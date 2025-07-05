import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useMe = (includeReviews: Boolean) => {
  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: `network-only`,
    variables: {
      includeReviews: includeReviews,
    },
  });

  if (!error && !loading) return { data, loading, refetch };
  return { error, loading, refetch };
};

export default useMe;
