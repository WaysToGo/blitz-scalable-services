// @material-ui/core components
import { createMuiTheme } from "@material-ui/core/styles"
import themeColors from "./colors"
import boxShadows from "./components/box-shadow"
import hexToRgb from "./hex-to-rgb"
// core components

// these are the default styles that go on all headings (h1,h2,h3,h4,h5,h6)
// the difference only consists in the font size and text transform
const defaultHeaderStyles = {
  marginBottom: ".5rem",
  fontFamily: "inherit",
  fontWeight: 600,
  color: `#606266 !important`,
}

// A custom theme for this app
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    ...themeColors,
  },
  typography: {
    fontFamily: "Open Sans,sans-serif",
    h1: {
      fontSize: "1.625rem",
      ...defaultHeaderStyles,
    },
    h2: {
      fontSize: "1.1rem",
      ...defaultHeaderStyles,
    },
    h3: {
      fontSize: "1.0625rem",
      ...defaultHeaderStyles,
    },
    h4: {
      fontSize: ".9375rem",
      ...defaultHeaderStyles,
    },
    h5: {
      fontSize: ".8125rem",
      ...defaultHeaderStyles,
    },
    h6: {
      fontSize: ".625rem",
      ...defaultHeaderStyles,
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        color: `${themeColors.primary.main} !important`,
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: "inherit !important",
      },
    },
    MuiMenu: {
      paper: {
        minWidth: "6rem",
        fontSize: "1rem",
        color: themeColors.gray[700],
        textAlign: "left",
        listStyle: "none",
        backgroundColor: themeColors.white.main,
        backgroundClip: "padding-box",
        boxShadow: boxShadows.menuBoxShadow,
        padding: ".5rem 0",
        marginTop: "25px",
      },
    },
    MuiMenuItem: {
      root: {
        padding: ".5rem 1rem",
        fontSize: ".875rem",
        width: "100%",
        clear: "both",
        fontWeight: 400,
        color: themeColors.gray[900],
        textAlign: "inherit",
        whiteSpace: "nowrap",
        backgroundColor: "initial",
        border: 0,
        "& i": {
          marginRight: "1rem",
          fontSize: "1rem",
          verticalAlign: "-17%",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: themeColors.gray[600],
        ffontSize: ".875rem",
        fontWeight: 600,
        fontSize: "14px",
        display: "inline-block",
        marginBottom: ".5rem",
      },
    },
    MuiFormGroup: {
      root: {
        marginBottom: "1.5rem",
      },
    },
    MuiInputBase: {
      root: {
        border: 0,
        transition: "box-shadow .15s ease",
        borderRadius: ".375rem",
        fontSize: "14px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
      },
      input: {
        border: 0,
        boxShadow: "none",
        position: "relative",
        flex: "1 1 auto",
        width: "1%",
        fontSize: "14px",
        minWidth: 0,
        marginBottom: 0,
        padding: ".625rem .75rem",
        "&:not(:first-child)": {
          borderLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "14px",
      },
      outlined: {
        transform: "translate(14px, 15px) scale(1)",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: ".625rem .75rem",
        borderTop: "0",
        borderBottom: "0",
        borderLeft: "0",
        "&:not(:last-child)": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          paddingRight: 0,
        },
      },
      root: {
        paddingRight: "0",
      },
    },
    MuiFilledInput: {
      underline: {
        "&:before": {
          display: "none",
        },
        "&:after": {
          borderRadius: ".375rem",
          height: "100%",
          border: "2px solid " + themeColors.primary.main,
        },
      },
      multiline: {
        padding: ".625rem .75rem",
      },
      root: {
        boxShadow: boxShadows.inputBoxShadow,
        border: 0,
        transition: "box-shadow .15s ease",
        //  borderRadius: ".375rem",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        backgroundColor: themeColors.white.main + "!important",
      },
      input: {
        border: 0,
        boxShadow: "none",
        position: "relative",
        flex: "1 1 auto",
        width: "1%",
        minWidth: 0,
        marginBottom: 0,
        padding: ".625rem .75rem",
        "&:not(:first-child)": {
          borderLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      },
      inputAdornedStart: {
        paddingLeft: ".75rem",
      },
      inputAdornedEnd: {
        paddingRight: ".75rem",
      },
    },
    MuiInputAdornment: {
      root: {
        transition: "all .2s cubic-bezier(.68,-.55,.265,1.55)",
        display: "flex",
        alignItems: "center",
        padding: ".625rem 0",
        marginBottom: "0",
        fontSize: ".875rem",
        fontWeight: 400,
        lineHeight: "1.5",
        color: themeColors.gray[500],
        textAlign: "center",
        whiteSpace: "nowrap",
        backgroundColor: themeColors.white.main,
        border: "0",
        marginTop: "0!important",
        height: "calc(1.5em + 1.25rem + 2px)",
      },
      positionEnd: {
        paddingLeft: 0,
      },
      positionStart: {
        paddingLeft: 0,
      },
      filled: {
        display: "flex",
        "&$positionStart": {
          marginRight: "-1px",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          border: "0",
          boxShadow: "none",
        },
      },
    },
    MuiCheckbox: {
      root: {
        "& .MuiSvgIcon-root": {
          width: "1rem",
          height: "1rem",
        },
      },
    },
    MuiTypography: {
      body1: {
        fontSize: "14px",
      },
    },
    MuiRadio: {
      root: {
        "& .MuiSvgIcon-root": {
          width: "1rem",
          height: "1rem",
        },
      },
    },
    MuiSwitch: {
      root: {
        width: "3.25rem",
        height: "1.5rem",
        padding: 0,
      },
      switchBase: {
        padding: "3px",
        "&$checked": {
          transform: "translateX(28px)",
          "& + $track": {
            backgroundColor: themeColors.transparent.main + "!important",
            borderColor: themeColors.primary.main,
            opacity: 1,
          },
          "& $thumb": {
            backgroundColor: themeColors.primary.main,
          },
        },
      },
      checked: {},
      thumb: {
        width: "18px",
        height: "18px",
        boxShadow: "none",
        backgroundColor: themeColors.gray[200],
      },
      track: {
        backgroundColor: themeColors.transparent.main,
        border: "1px solid " + themeColors.gray[400],
        opacity: 1,
        borderRadius: "34px",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        letterSpacing: ".025em",
        borderRadius: ".175rem",
        display: "inline-block",
        transition: "all .15s ease",
        willChange: "transform",
        textAlign: "center",
        verticalAlign: "middle",
        "&:hover": {
          transform: "translateY(-1px)",
        },
      },
      outlinedSecondary: {
        color: themeColors.primary.main,
        borderColor: themeColors.secondary.light,
        backgroundColor: themeColors.white.main,
        "&:hover": {
          backgroundColor: `${themeColors.primary.main}`,
          color: `${themeColors.white.main}`,
        },
      },
      containedPrimary: {
        color: themeColors.white.main,
        borderColor: themeColors.primary.main,
        backgroundColor: themeColors.primary.main,
        "&:hover": {
          backgroundColor: `${themeColors.primary.main}`,
          color: `${themeColors.white.main}`,
        },
      },
    },
    MuiSvgIcon: {
      root: {
        width: "21px",
        height: "21px",
      },
    },
    MuiCard: {
      root: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        wordWrap: "break-word",
        backgroundColor: themeColors.white.main,
        backgroundClip: "initial",
        border: "0",
        borderRadius: ".375rem",
        overflow: "unset",
      },
    },
    MuiCardHeader: {
      root: {
        padding: "1.25rem 1.5rem",
        marginBottom: "0",
        backgroundColor: themeColors.secondary.light,
        borderBottom: "1px solid rgba(" + hexToRgb(themeColors.black.main) + ",.05)",
        "&:first-child": {
          borderRadius: "calc(.375rem - 1px) calc(.375rem - 1px) 0 0",
        },
      },
    },
    MuiCardContent: {
      root: {
        flex: "1 1 auto",
        minHeight: "1px",
        padding: "1.5rem",
      },
    },
    MuiCardActions: {
      root: {
        "&:last-child": {
          borderRadius: "0 0 calc(.375rem - 1px) calc(.375rem - 1px)",
          padding: "1.25rem 1.5rem",
          backgroundColor: themeColors.white.main,
          borderTop: "1px solid rgba(" + hexToRgb(themeColors.black.main) + ",.05)",
        },
      },
    },
    MuiGrid: {
      item: {
        paddingRight: "15px",
        paddingLeft: "15px",
      },
      container: {
        // width: "unset",
      },
    },
  },
})

export default theme
