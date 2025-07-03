import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useMe = (includeReviews: Boolean) => {
  console.log(includeReviews, "this is the variable");
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: `network-only`,
    variables: {
      includeReviews: includeReviews,
    },
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useMe;
