import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: `cache-and-network`,
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useRepositories;
