import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  flexItem: {
    flexGrow: 0,
    alignSelf: "flex-start",
    margin: 5,
    marginBottom: 10,
  },
  // ...
});

interface Props {
  item: string;
  link?: string;
  onClick?: () => Promise<void>;
}

const AppBarTab = ({ item, link, onClick }: Props) => {
  if (link && !onClick) {
    return (
      <Link to={link} style={styles.flexItem}>
        <Text fontSize="subheading" fontWeight="bold" color="white">
          {item}
        </Text>
      </Link>
    );
  }
  return (
    <Pressable style={styles.flexItem} onPress={onClick}>
      <Text fontSize="subheading" fontWeight="bold" color="white">
        {item}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
