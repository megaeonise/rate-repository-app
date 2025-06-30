import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

interface repositoriesProps {
  orderDirection: String;
  orderBy: String;
}

const useRepositories = ({ orderBy, orderDirection }: repositoriesProps) => {
  console.log(orderDirection, orderBy);
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: `cache-and-network`,
    variables: { orderDirection: orderDirection, orderBy: orderBy },
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useRepositories;
