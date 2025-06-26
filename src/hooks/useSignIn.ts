import { useApolloClient, useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  interface signInProps {
    username: String;
    password: String;
  }

  const signIn = async ({ username, password }: signInProps) => {
    const data = await mutate({ variables: { username, password } });
    console.log(data);
    console.log(data.data.authenticate.accessToken);
    if (authStorage && data.data)
      await authStorage?.setAccessToken(data.data.authenticate.accessToken);
    return data;
  };
  apolloClient.resetStore();
  return [signIn, result];
};

export default useSignIn;
