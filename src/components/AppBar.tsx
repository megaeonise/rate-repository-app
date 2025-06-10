import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: theme.colors.grey,
  },
  flexItem: {
    flexGrow: 0,
    alignSelf: "flex-start",
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <AppBarTab item="Repository" link="/" />
        <AppBarTab item="Sign In" link="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
