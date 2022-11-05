import { ReactNode } from "react"
import { Head, Link } from "blitz"
import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import { Box } from "@material-ui/core"
import boxShadows from "../theme/components/box-shadow"
import themeColors from "app/core/theme/colors"

const appBarHight = 50
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: appBarHight,
    boxShadow: boxShadows.boxShadow,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    opacity: 0.9,
  },
  title: {
    display: "none",
    cursor: "pointer",
    paddingLeft: "15px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}))

type Header = {
  title?: string
  children: ReactNode
}

const Header = ({ title, children }: Header) => {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{title || "ATS"}</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar)} color="inherit" elevation={1}>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <h1 style={{ color: themeColors.white.main }}>ATS</h1>
            </Link>
          </Typography>
        </AppBar>
        <Box mt={5}>{children}</Box>
      </div>
    </>
  )
}

export default Header
