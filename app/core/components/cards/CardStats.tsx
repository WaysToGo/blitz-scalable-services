import React from "react"
// @material-ui/core components
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// core components
import boxShadows from "app/core/theme/components/box-shadow"
import themeColors from "app/core/theme/colors"

const useStyles = makeStyles((theme) =>
  createStyles({
    cardRoot: {
      marginBottom: "1.5rem",
      [theme.breakpoints.up("xl")]: {
        marginBottom: 0,
      },
      margin: "10px",
    },
    cardContentRoot: {
      padding: "1rem 1.5rem !important",
    },
    textUppercase: {
      textTransform: "uppercase",
      fontSize: "12px",
    },
    icon: {
      backgroundColor: themeColors.dashboard.iconBg,
    },
    title: {
      fontSize: "1.2rem",
    }
  })
)

function CardStats({ subtitle, title, footer, icon }) {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <>
      <Card classes={{ root: classes.cardRoot }} elevation={0}>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Grid container justifyContent="space-between">
            <Grid item xs="auto">
              <Box
                component={Typography}
                color={"#777"}
                marginBottom="0!important"
                marginTop="0!important"
                className={classes.textUppercase}
              >
                {subtitle}
              </Box>
              <Box
                component={Typography}
                fontWeight="600!important"
                marginBottom="0!important"
                marginTop="0!important"
                className={classes.title}
              >
                {title}
              </Box>
            </Grid>
            <Grid item xs={"auto"}>
              <Box
                width="2.6rem"
                height="2.6rem"
                padding="12px"
                textAlign="center"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                boxShadow={boxShadows.boxShadow}
                color={theme.palette.common.white}
                className={classes.icon}
              >
                {icon && typeof icon === "object" ? (
                  <Box component={icon} width="1.5rem!important" height="1.5rem!important" />
                ) : null}
                {icon && typeof icon === "string" ? (
                  <Box component="i" fontSize="1.25rem" className={icon} />
                ) : null}
              </Box>
            </Grid>
          </Grid>
          {footer ? (
            <Box
              component="p"
              fontSize=".875rem"
              color={"#777"}
              marginTop="1rem"
              marginBottom="0"
              display="flex"
              alignItems="center"
              flexWrap="wrap"
            >
              {footer}
            </Box>
          ) : null}
        </CardContent>
      </Card>
    </>
  )
}

export default CardStats
