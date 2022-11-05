import { AuthenticationError, Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Welcome from "./Welcome"
import themeColors from "app/core/theme/colors"
import Link from "@material-ui/core/Link"

type LoginFormProps = {
  onSuccess?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
  },

  leftContainer: {
    width: "100%",
    marginBottom: 25,
  },
  loginCard: {
    margin: theme.spacing(5, 0),
    width: "80%",
    maxWidth: "500px",
  },
  rightContainer: {
    textAlign: "center",
  },
  headerText: {
    color: "#032d60",
  },
  form: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
  welcome: {
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))



export const LoginForm = (props: LoginFormProps) => {
  const classes = useStyles()
  const [loginMutation] = useMutation(login)

  return (
    <Box>
      <Grid container className={classes.root}>
        <Grid md={12} lg={6} justifyContent="center" alignContent="center" container>
          <Box
            justifyContent="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.leftContainer}
          >
            <Avatar style={{ backgroundColor: themeColors.primary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <h1 style={{ color: themeColors.primary.main }}>ATS</h1>
            <Card className={classes.loginCard} raised>
              <Form
                className={classes.form}
                noValidate
                autoComplete="off"
                schema={Login}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    await loginMutation(values)
                    props.onSuccess?.()
                  } catch (error) {
                    if (error instanceof AuthenticationError) {
                      return { [FORM_ERROR]: "The email or password is incorrect. Try again!" }
                    } else {
                      return {
                        [FORM_ERROR]:
                          "Sorry, we had an unexpected error. Please try again. - " +
                          error.toString(),
                      }
                    }
                  }
                }}
              >
                <LabeledTextField
                  id="email"
                  margin="normal"
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <LabeledTextField
                  id="password"
                  margin="normal"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                {/* <Grid>
                  <Grid item md>
                    <Link underline="hover" href={"/forgot-password"}>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid> */}
                <Box>
                  <Link href={Routes.SignupPage().pathname}>Sign Up</Link>
                </Box>
              </Form>
            </Card>
            <Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={12} lg={6} className={classes.welcome}>
          <Welcome />
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginForm
