import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (id: string) => {
    console.log(id, "in delete rewview");
    const data = await mutate({
      variables: {
        deleteReviewId: id,
      },
    });
    apolloClient.resetStore();
    console.log(data);
    return data;
  };

  return [deleteReview, result] as const;
};

export default useDeleteReview;
