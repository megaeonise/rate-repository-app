import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";

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
      <Pressable
        style={styles.flexItem}
        onTouchStart={() => {
          console.log("pressed");
        }}
      >
        <Text fontSize="subheading" fontWeight="bold" color="white">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
