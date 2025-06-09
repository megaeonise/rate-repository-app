import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import Text from "./Text";
import theme from "../theme";

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
      <Text>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  );
};

export default Main;
