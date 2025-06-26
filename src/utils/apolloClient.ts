import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";
import AuthStorage from "./authStorage";
import { setContext } from "@apollo/client/link/context";

let uri = "";
if (Constants && Constants.expoConfig && Constants.expoConfig.extra)
  uri = Constants.expoConfig.extra.apollo_uri;

const apolloUri = uri;

const httpLink = createHttpLink({
  uri: apolloUri,
});

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
