import store from "app/store"

const texturizedDynamic = {
  //Texturized and Dynamic
  primary: {
    main: "#376E6F",
    dark: "#233dd2",
    snackbar: "#7889e8",
    badgeBg: "#eaecfb",
    badgeBgHover: "#2a44db",
    badge: "#2643e9",
    contrastText: "#FFFFFF",
  },
  dashboard: {
    header: "#376E6F",
    bgColor: "linear-gradient(92deg, #d7e7e2, #d7e7e2)",
    //bgColor: "#adc7dc",
    barChartA: "#478f7c",
    barChartB: "#6f3837",
    barChartC: "#c1a3a2",
    iconBg: "#376E6F",
  },
  secondary: {
    main: "#87c8b4",
    light: "#d7e7e2",
    snackbar: "#f8fbfc",
    badgeBgHover: "#cadeeb",
    btnOutline: "#4385b1",
    btnActive: "#d2e3ee",
  },
  white: {
    main: "#FFFFFF",
  },
  black: {
    light: "#12263F",
    main: "#000000",
  },
  transparent: {
    main: "#e1ede9",
  },
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
    901: "#ebe8e9",
  },
  warning: {
    light: "#ffd600",
    main: "#fb6340",
    snackbar: "#fc7c5f",
    badgeBg: "#fee6e0",
    badgeBgHover: "#f93305",
    badge: "#ff3709",
  },
  error: {
    light: "#f3a4b5",
    main: "#f5365c",
    snackbar: "#f75676",
    badgeBg: "#fdd1da",
    badgeBgHover: "#e30b36",
    badge: "#f80031",
    dialogNotification: "#f56036",
  },
  info: {
    main: "#11cdef",
    snackbar: "#37d5f2",
    badgeBg: "#aaedf9",
    badgeBgHover: "#0c9cb7",
    badge: "#03acca",
  },
  background: {
    default: "#f8f9fe",
  },
  text: {
    primary: "#525f7f",
  },
  dark: {
    tableBorder: "#1f3a68",
    tableHeadColor: "#4d7bca",
    tableHeadBgColor: "#1c345d",
    main: "#172b4d",
    dark: "#0b1526",
    snackbar: "#3c4d69",
    badgeBg: "#4172c6",
    badgeBgHover: "#09111e",
  },
  success: {
    main: "#2dce89",
    snackbar: "#4fd69c",
    badgeBg: "#b0eed3",
    badgeBgHover: "#229c68",
    badge: "#1aae6f",
  },
}
const cleanAndModern = {
  //Clean and Modern
  primary: {
    main: "#3AAFA9",
    dark: "#233dd2",
    snackbar: "#7889e8",
    badgeBg: "#eaecfb",
    badgeBgHover: "#2a44db",
    badge: "#2643e9",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#aef1e0",
    light: "#ccf4f1",
    snackbar: "#f8fbfc",
    badgeBgHover: "#cadeeb",
    btnOutline: "#4385b1",
    btnActive: "#d2e3ee",
  },
  dashboard: {
    header: "#3AAFA9",
    bgColor: "linear-gradient(92deg, #d7e7e2, #d7e7e2)",
    barChartA: "#3AAFA9",
    barChartB: "#d98643",
    barChartC: "#c1a3a2",
    iconBg: "#3AAFA9",
  },
  white: {
    main: "#FFFFFF",
  },
  black: {
    light: "#12263F",
    main: "#000000",
  },
  transparent: {
    main: "#e1ede9",
  },
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
    901: "#ebe8e9",
  },
  warning: {
    light: "#ffd600",
    main: "#fb6340",
    snackbar: "#fc7c5f",
    badgeBg: "#fee6e0",
    badgeBgHover: "#f93305",
    badge: "#ff3709",
  },
  error: {
    light: "#f3a4b5",
    main: "#f5365c",
    snackbar: "#f75676",
    badgeBg: "#fdd1da",
    badgeBgHover: "#e30b36",
    badge: "#f80031",
    dialogNotification: "#f56036",
  },
  info: {
    main: "#11cdef",
    snackbar: "#37d5f2",
    badgeBg: "#aaedf9",
    badgeBgHover: "#0c9cb7",
    badge: "#03acca",
  },
  background: {
    default: "#f8f9fe",
  },
  text: {
    primary: "#525f7f",
  },
  dark: {
    tableBorder: "#1f3a68",
    tableHeadColor: "#4d7bca",
    tableHeadBgColor: "#1c345d",
    main: "#172b4d",
    dark: "#0b1526",
    snackbar: "#3c4d69",
    badgeBg: "#4172c6",
    badgeBgHover: "#09111e",
  },
  success: {
    main: "#2dce89",
    snackbar: "#4fd69c",
    badgeBg: "#b0eed3",
    badgeBgHover: "#229c68",
    badge: "#1aae6f",
  },
}
const artsyAndCreative = {
  //Artsy and Creative
  primary: {
    main: "#4056a1",
    dark: "#233dd2",
    snackbar: "#7889e8",
    badgeBg: "#eaecfb",
    badgeBgHover: "#2a44db",
    badge: "#2643e9",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#7190f6",
    light: "#92a9f5",
    snackbar: "#f8fbfc",
    badgeBgHover: "#cadeeb",
    btnOutline: "#4385b1",
    btnActive: "#d2e3ee",
  },
  dashboard: {
    header: "#4056a1",
    bgColor: "linear-gradient(92deg, #92a9f5, #92a9f5)",
    barChartA: "#4056a1",
    barChartB: "#d98643",
    barChartC: "#c1a3a2",
    iconBg: "#4056a1",
  },
  white: {
    main: "#FFFFFF",
  },
  black: {
    light: "#12263F",
    main: "#000000",
  },
  transparent: {
    main: "#e1ede9",
  },
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
    901: "#ebe8e9",
  },
  warning: {
    light: "#ffd600",
    main: "#fb6340",
    snackbar: "#fc7c5f",
    badgeBg: "#fee6e0",
    badgeBgHover: "#f93305",
    badge: "#ff3709",
  },
  error: {
    light: "#f3a4b5",
    main: "#f5365c",
    snackbar: "#f75676",
    badgeBg: "#fdd1da",
    badgeBgHover: "#e30b36",
    badge: "#f80031",
    dialogNotification: "#f56036",
  },
  info: {
    main: "#11cdef",
    snackbar: "#37d5f2",
    badgeBg: "#aaedf9",
    badgeBgHover: "#0c9cb7",
    badge: "#03acca",
  },
  background: {
    default: "#f8f9fe",
  },
  text: {
    primary: "#525f7f",
  },
  dark: {
    tableBorder: "#1f3a68",
    tableHeadColor: "#4d7bca",
    tableHeadBgColor: "#1c345d",
    main: "#172b4d",
    dark: "#0b1526",
    snackbar: "#3c4d69",
    badgeBg: "#4172c6",
    badgeBgHover: "#09111e",
  },
  success: {
    main: "#2dce89",
    snackbar: "#4fd69c",
    badgeBg: "#b0eed3",
    badgeBgHover: "#229c68",
    badge: "#1aae6f",
  },
}
// experiment with different themes use the commented theme below

let themeColors = {
  ...texturizedDynamic,
}
store.subscribe(() => {
  window.location.reload()
})
if (typeof window !== "undefined") {
  const themeId = localStorage.getItem("themeId")
  switch (themeId) {
    case "texturized-and-dynamic":
      themeColors = {
        ...texturizedDynamic,
      }
      break
    case "clean-and-modern":
      themeColors = {
        ...cleanAndModern,
      }
      break
    case "artsy-and-creative":
      themeColors = {
        ...artsyAndCreative,
      }
      break
    default:
      themeColors = {
        ...texturizedDynamic,
      }
      break
  }
}

export default themeColors
