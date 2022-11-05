import { Tooltip, withStyles } from "@material-ui/core"
import boxShadows from "app/core/theme/components/box-shadow"
import theme from "app/core/theme/theme"

const CustomTooltip = withStyles({
  tooltip: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    padding: "5px",
    boxShadow: boxShadows.popoverBoxShadow,
  },
})(Tooltip)

export { CustomTooltip }
