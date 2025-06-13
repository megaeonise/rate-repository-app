import { Platform } from "react-native";

enum fontWeights {
  normal = "400",
  bold = "700",
}

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    grey: "#24292e",
    white: "white",
    red: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: fontWeights.normal,
    bold: fontWeights.bold,
  },
  backgroundColors: {
    mainBg: "#e1e4e8",
  },
};

export default theme;
