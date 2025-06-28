import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id: string) => {
  console.log(id);
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: `cache-and-network`,
    variables: {
      id: id,
    },
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useRepository;
