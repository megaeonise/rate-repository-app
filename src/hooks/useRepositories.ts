import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

interface repositoriesProps {
  orderDirection: String;
  orderBy: String;
  searchKeyword: String;
}

const useRepositories = ({
  orderBy,
  orderDirection,
  searchKeyword,
}: repositoriesProps) => {
  console.log(searchKeyword);
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: `cache-and-network`,
    variables: {
      orderDirection: orderDirection,
      orderBy: orderBy,
      searchKeyword: searchKeyword,
    },
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useRepositories;
