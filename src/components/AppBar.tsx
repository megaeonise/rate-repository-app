import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";
import useSignOut from "../hooks/useSignOut";

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
  const { data } = useMe();
  const signOut = useSignOut();
  if (data.me) {
    return (
      <View style={styles.flexContainer}>
        <ScrollView horizontal>
          <AppBarTab item="Repository" link="/" />
          <AppBarTab item="Sign Out" onClick={signOut} />
        </ScrollView>
      </View>
    );
  }
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
