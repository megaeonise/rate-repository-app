import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useMe = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: `network-only`,
  });

  if (!error && !loading) return { data, loading };
  return { error, loading };
};

export default useMe;
