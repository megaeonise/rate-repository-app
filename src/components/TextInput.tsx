import {
  TextInput as NativeTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { FC } from "react";
import theme from "../theme";

interface Props {
  error: boolean;
  options: TextInputProps;
}

const styles = StyleSheet.create({
  textInputItem: {
    padding: 10,
    borderRadius: 2,
    borderColor: theme.colors.grey,
    borderWidth: 1,
    marginTop: 10,
    flexGrow: 0,
    width: 300,
  },
  textInputErrorItem: {
    padding: 10,
    borderRadius: 2,
    borderColor: theme.colors.red,
    borderWidth: 1,
    marginTop: 10,
    flexGrow: 0,
    width: 300,
  },
});

const TextInput: FC<Props> = ({ error, options }: Props) => {
  return (
    <NativeTextInput
      style={error ? styles.textInputErrorItem : styles.textInputItem}
      {...options}
    />
  );
};

export default TextInput;
