import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const params = useParams();
  if (params.id) {
    const { data } = useRepository(params.id);
    if (data) {
      return <RepositoryItem item={data.repository} />;
    }
    return <></>;
  }
  return <></>;
};

export default SingleRepository;
