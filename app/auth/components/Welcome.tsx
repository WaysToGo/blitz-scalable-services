// @ts-nocheck
import React from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapperBox: {
      [theme.breakpoints.up("md")]: {
        paddingTop: "2rem",
      },
    },
    overlayBox: {
      transition: "all .15s ease",
      opacity: ".9",
      backgroundColor: theme.palette.primary.main,
    },
    containerRoot: {
      zIndex: 1,
      textAlign: "center",
      marginLeft: "15%",
    },
    typographyRootH1: {
      color: `${theme.palette.white.main} !important`,
      [theme.breakpoints.up("md")]: {
        fontSize: "2.75rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
    },
  })
)

const Welcome = () => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        className={classes.wrapperBox}
        minHeight="100px"
        position="relative"
        width="100%"
        height="100%"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          className={classes.overlayBox}
        />
        <Container
          display="flex"
          alignItems="center"
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <Grid container>
            <Typography variant="h1" classes={{ root: classes.typographyRootH1 }}>
              Welcome to ATS!
              <Box
                component="p"
                color={theme.palette.white.main}
                lineHeight="1.7"
                fontSize="1.5rem"
              >
                ATS Tracking application.
              </Box>
            </Typography>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Welcome
