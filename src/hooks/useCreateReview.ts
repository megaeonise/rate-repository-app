import { useApolloClient, useMutation } from "@apollo/client";
import { REVIEW } from "../graphql/mutations";
import { ReviewValues } from "../../types";

const useCreateReview = () => {
  const [mutate, result] = useMutation(REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
  }: ReviewValues) => {
    const data = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating: Number(rating), text },
      },
    });
    apolloClient.resetStore();
    console.log(data);
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
