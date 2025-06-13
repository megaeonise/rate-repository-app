import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  if (Constants && Constants.expoConfig && Constants.expoConfig.extra) {
    return new ApolloClient({
      uri: `${Constants.expoConfig.extra.apollo_uri}`,
      cache: new InMemoryCache(),
    });
  } else {
    return new ApolloClient({
      uri: "http://192.168.0.1:4000/graphql",
      cache: new InMemoryCache(),
    });
  }
};

export default createApolloClient;
