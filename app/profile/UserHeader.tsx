// @ts-nocheck
import React from "react"

// @material-ui/core components
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

// core components

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapperBox: {
      [theme.breakpoints.up("md")]: {
        paddingTop: "2rem",
      },
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundImage: "url(/assets/images/fse_back.png)",
    },
    overlayBox: {
      transition: "all .15s ease",
      opacity: ".9",
      background: "linear-gradient(87deg," + theme.palette.dark.main + ",#1a174d)!important",
    },
    containerRoot: {
      zIndex: 1,
      [theme.breakpoints.up("md")]: {
        paddingLeft: "39px",
        paddingRight: "39px",
      },
    },
    typographyRootH1: {
      color: `${theme.palette.white.main} !important`,
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.5,
      marginTop: "5px",
    },
  })
)

const UserHeader = () => {
  const classes = useStyles()
  const { name, email, role } = useCurrentUser()
  const theme = useTheme()
  const day = new Date()
  const hr = day.getHours()
  let greeting = "Good Day!"
  if (hr >= 0 && hr < 12) {
    greeting = "Good Morning!"
  } else if (hr == 12) {
    greeting = "Good Noon!"
  } else if (hr >= 12 && hr <= 17) {
    greeting = "Good Afternoon!"
  } else {
    greeting = "Good Evening!"
  }
  return (
    <>
      <Box
        paddingBottom="8rem"
        alignItems="center"
        display="flex"
        className={classes.wrapperBox}
        minHeight="100px"
        position="relative"
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
            <Grid item xs={12} md={10} lg={7}>
              <Typography variant="h1" classes={{ root: classes.typographyRootH1 }}>
                Hello, {name}
              </Typography>
              <Box component="p" color={theme.palette.white.main} lineHeight="1.7" fontSize="1rem">
                {greeting}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default UserHeader
