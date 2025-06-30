import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import Review from "./Review";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.mainBg,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      {/* <Text>Rate Repository Application</Text> */}
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/review" element={<Review />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
