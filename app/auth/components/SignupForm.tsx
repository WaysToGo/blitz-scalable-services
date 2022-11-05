import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LabeledDropdownField from "app/core/components/LabeledDropdownField"

type SignupFormProps = {
  onSuccess?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  form: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
  leftContainer: {
    width: "100%",
    margin: theme.spacing(10),
  },
  loginCard: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const classes = useStyles()
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
            <Typography component="h1" variant="h1">
              Create an Account
            </Typography>
            <Card className={classes.loginCard} raised>
              <Form
                submitText="Create Account"
                className={classes.form}
                schema={Signup}
                initialValues={{ name: "", email: "", phone: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    await signupMutation(values)
                    props.onSuccess?.()
                  } catch (error) {
                    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                      // This error comes from Prisma
                      return { email: "This email is already being used" }
                    } else {
                      return { [FORM_ERROR]: error.toString() }
                    }
                  }
                }}
              >
                <LabeledTextField name="name" label="First Name" placeholder="firstname" />
                <LabeledTextField name="email" label="Email" placeholder="Email" />
                <LabeledTextField name="phone" label="Phone" placeholder="phone" />

                <LabeledDropdownField name="role" label="Role" placeholder="Role" options={['HR', 'User']} />
                <LabeledTextField name="company" label="Company" placeholder="company" />
                <LabeledTextField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                />
              </Form>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignupForm
