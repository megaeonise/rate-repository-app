import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  interface signInProps {
    username: String;
    password: String;
  }

  const signIn = async ({ username, password }: signInProps) => {
    return await mutate({ variables: { username, password } });
  };
  return [signIn, result];
};

export default useSignIn;
