import { useApolloClient, useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);
  const apolloClient = useApolloClient();

  interface signUpProps {
    username: String;
    password: String;
  }

  const signUp = async ({ username, password }: signUpProps) => {
    const data = await mutate({ variables: { user: { username, password } } });
    apolloClient.resetStore();
    return data;
  };

  return [signUp, result] as const;
};

export default useSignUp;
