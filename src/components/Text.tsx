import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  white: {
    color: theme.colors.white,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backgroundBlue: {
    backgroundColor: theme.colors.primary,
  },
});

interface Props {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  style?: any;
  children?: string | number | string[];
  backgroundColor?: string;
}

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  children,
  ...props
}: Props) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "white" && styles.white,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    backgroundColor === "blue" && styles.backgroundBlue,
    style,
  ];
  console.log(textStyle);

  return (
    <NativeText style={textStyle} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
