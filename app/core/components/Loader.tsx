import React from "react"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import themeColors from "../theme/colors"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    loader: {
      borderRadius: "10px",
    },
  })
)

export default function Loader() {
  const classes = useStyles()

  return (
    <div>
      <Backdrop open={true} className={classes.backdrop}>
        {/* <Image
          src="/assets/loaders/servishero.gif"
          alt="ATS"
          className={classes.loader}
          width={100}
          height={100}
        /> */}
        <Box
          style={{
            height: "80px",
            width: "80px",
            padding: "25px",
            borderRadius: "10px",
            backgroundColor: themeColors.secondary.light,
          }}
        >
          <CircularProgress color="primary" size={30} />
        </Box>
      </Backdrop>
    </div>
  )
}
