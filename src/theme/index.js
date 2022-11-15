import { createGlobalStyle } from "styled-components";

const theme = {
  colors: {
    primary: {
      light: "#282828",
      main: "#1B1B1B",
      dark: "#141414",
      contrastText: "#fff",
    },
    secondary: {
      light: "#E5F5F4",
      main: "#EDE363",
      dark: "#006661",
      error: "#DF165D",
      contrastText: "#fff",
    },
    grey: {
      light: "#cccccc",
      main: "#808080",
      dark: "#4d4d4d",
    },
  },
  shadows: {
    light: "",
    main: "0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19)",
    dark: "",
  },
  border_radius: "",
  fontSize: {
    extra: "45px",
    heading: "30px",
    subHeading: "23px",
    content: "17px",
    caption: "13px",
  },
  fontFamily: {
    robotoBold: "Roboto-Bold",
    robotoMedium: "Roboto-Medium",
    robotoRegular: "Roboto-Regular",
    robotoThin: "Roboto-Thin",
  },
  devices: {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "1600px",
    desktopL: "1920px",
  },
};

export const testTheme = {
  colors: {
    primary: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "#fff",
    },
    grey: {
      light: "#f2f2f2",
      main: "#808080",
      dark: "#4d4d4d",
    },
  },
  shadows: {
    light: "",
    main: "",
    dark: "",
  },
  border_radius: "",
  fontSize: {
    heading: "27px",
    subHeading: "18px",
    content: "14px",
    caption: "10px",
  },
  fontFamily: {
    robotoBold: "Roboto-Bold",
    robotoMedium: "Roboto-Medium",
    robotoRegular: "Roboto-Regular",
    robotoThin: "Roboto-Thin",
  },
};

export const GlobalStyles = createGlobalStyle`
    body{
        background-color:${(props) =>
          props.theme.colors.primary.main} !important
    }
`;

export default theme;
