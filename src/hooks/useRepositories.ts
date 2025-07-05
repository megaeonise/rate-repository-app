import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

interface repositoriesProps {
  orderDirection: String;
  orderBy: String;
  searchKeyword: String;
  first: Number;
}

const useRepositories = ({
  orderBy,
  orderDirection,
  searchKeyword,
  first,
}: repositoriesProps) => {
  console.log(searchKeyword);
  const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: `cache-and-network`,
    variables: {
      orderDirection: orderDirection,
      orderBy: orderBy,
      searchKeyword: searchKeyword,
      first: first,
    },
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        orderDirection: orderDirection,
        orderBy: orderBy,
        searchKeyword: searchKeyword,
        first: first,
        after: data.repositories.pageInfo.endCursor,
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

export default useRepositories;
