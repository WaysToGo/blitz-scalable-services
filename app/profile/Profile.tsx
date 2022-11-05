// @ts-nocheck
import React, { Suspense, useState } from "react"
// @material-ui/core components
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import FilledInput from "@material-ui/core/FilledInput"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn"
import boxShadows from "app/core/theme/components/box-shadow"
import UserHeader from "./UserHeader"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Store } from "@material-ui/icons"
import Modal from "app/core/components/Modal/Modal"
import Loader from "app/core/components/Loader"
import EditUserFormWrapper from "app/admin/users/components/EditUserFormWrapper"
import useModal from "app/core/hooks/useModal"
import { userFormSchema } from "app/admin/users/schemas/userFormSchema"
import { editUserFormSchema } from "app/admin/users/schemas/editUserFormSchema"

// core components

const useStyles = makeStyles((theme) =>
  createStyles({
    cardRoot: {
      boxShadow: boxShadows.boxShadow + "!important",
      border: "0!important",
    },
    cardRootSecondary: {
      backgroundColor: "#f7fafc",
    },
    cardHeaderRoot: {
      backgroundColor: theme.palette.white.main + "!important",
    },
    containerRoot: {
      [theme.breakpoints.up("md")]: {
        paddingLeft: "39px",
        paddingRight: "39px",
      },
    },
    gridItemRoot: {
      [theme.breakpoints.up("xl")]: {
        marginBottom: "0!important",
      },
    },
    typographyRootH6: {
      textTransform: "uppercase",
    },
    plLg4: {
      [theme.breakpoints.up("md")]: {
        paddingLeft: "1.5rem",
      },
    },
    ptMd4: {
      [theme.breakpoints.up("sm")]: {
        paddingTop: "1.5rem!important",
      },
    },
    mtMd5: {
      [theme.breakpoints.up("sm")]: {
        paddingTop: "3rem!important",
      },
    },
    cardHeaderRootProfile: {
      [theme.breakpoints.up("sm")]: {
        paddingBottom: "1.5rem!important",
        paddingTop: "1.5rem!important",
      },
    },
    buttonRootInfo: {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.info.main,
      "&:hover": {
        backgroundColor: theme.palette.info.dark,
      },
    },
    buttonRootDark: {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.dark.main,
      "&:hover": {
        backgroundColor: theme.palette.dark.dark,
      },
    },
    profileImage: {
      verticalAlign: "middle",
      borderStyle: "none",
      transform: "translate(-50%,-30%)",
      transition: "all .15s ease",
      backgroundColor: theme.palette.secondary.light,
    },
    cardProfileLink: {
      color: theme.palette.primary.main,
      backgroundColor: "initial",
      textDecoration: "none",
      fontSize: "1rem",
      "&:hover": {
        color: theme.palette.primary.dark,
      },
    },
    order1: {
      [theme.breakpoints.down("lg")]: {
        order: "1!important",
      },
    },
    order2: {
      [theme.breakpoints.down("lg")]: {
        order: "2!important",
      },
    },
    marginBottomXl0: {
      [theme.breakpoints.up("lg")]: {
        marginBottom: "0!important",
      },
    },
  })
)

function Profile() {
  const user = useCurrentUser()
  const {
    name,
    email,
    role,
    phone,
    address,
    city,
    stateorprovince,
    country,
    postalcode,
    officephone,
    homephone,
    alternateemail,
  } = user
  const classes = useStyles()
  const theme = useTheme()
  const isDisabled = true
  const { toggle: toggleEdit, isShowing: showEdit } = useModal()
  let location = ""
  if (city & stateorprovince) {
    location = `${city}, ${stateorprovince}`
  } else if (city) {
    location = `${city}`
  } else if (stateorprovince) {
    location = `${stateorprovince}`
  } else {
    location = "Unknown Location"
  }

  return (
    <>
      <UserHeader />
      {showEdit && (
        <Modal open={showEdit} handleClose={toggleEdit} title={"Update Profile"}>
          <Suspense fallback={<Loader />}>
            <EditUserFormWrapper
              handleClose={toggleEdit}
              selectedRow={user}
              formSchema={editUserFormSchema}
            />
          </Suspense>
        </Modal>
      )}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootSecondary,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box component={Typography} variant="h3" marginBottom="0!important">
                        My Account
                      </Box>
                    </Grid>
                    <Grid item xs="auto">

                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  User Information
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={name}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={email}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Phone</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={phone}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Role</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={role}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="1.5rem!important"
                />
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Contact Information
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel>Address</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={address}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>City</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={city}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={stateorprovince}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Country</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={country}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Zip/Postal Code</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            value={postalcode}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="1.5rem!important"
                />
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Additional Information
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Office Phone</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="number"
                            value={officephone}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Home Phone</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          placeholder="Home phone"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="number"
                            value={homephone}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <FormGroup>
                        <FormLabel>Alternate Email</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                          disabled={isDisabled}
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="email"
                            value={alternateemail}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            xl={4}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
          >
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative">
                    <Box
                      component="img"
                      src={"/assets/images/defaultAvatar.png"}
                      alt="..."
                      maxWidth="160px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
                marginTop="8rem"
              >
                <Box textAlign="center">
                  <Typography variant="h3">{name}</Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component={LocationOn}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    ></Box>
                    {location}
                  </Box>
                  <Box component={Typography} variant="h5" marginTop="3rem!important">
                    Role: {role}
                  </Box>

                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
