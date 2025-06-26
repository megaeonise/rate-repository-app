import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const SignOut = async () => {
    await authStorage?.removeAccessToken();
    apolloClient.resetStore();
  };

  return SignOut;
};

export default useSignOut;
