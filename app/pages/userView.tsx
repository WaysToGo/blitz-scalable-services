import { Suspense } from "react"
import { Head, BlitzPage, useQuery, useMutation, invalidateQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
import Profile from "app/profile/Profile"
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core"
import CardStats from "app/core/components/cards/CardStats"
import { AssignmentLateOutlined, AssignmentTurnedInOutlined, CheckCircleOutlineOutlined, StoreOutlined } from "@material-ui/icons"
import themeColors from "app/core/theme/colors"
import useModal from "app/core/hooks/useModal"
import Modal from "app/core/components/Modal/Modal"
import Loader from "app/core/components/Loader"
import { postNewJobSchema } from "app/jobs/schema/postNewJobSchema"
import PostNewJobFormWrapper from "app/jobs/schema/PostNewJobFormWrapper"
import getJobsCount from "app/jobs/queries/getJobsCount"
import getJobs from "app/jobs/queries/getJobs"
import createReview from "app/reviews/mutations/createReview"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useSnackbar } from "notistack"
import getReview from "app/reviews/queries/getReview"
import getReviews from "app/reviews/queries/getReviews"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   maxWidth: 345,
    // },
    header: {
      position: "relative",
      background: themeColors.dashboard.bgColor,
      // color: themeColors.dashboard.header,
      paddingBottom: "2rem",
      paddingTop: "2rem",
      [theme.breakpoints.up("md")]: {
        paddingTop: "1rem",
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    tabs: {
      color: 'black'
    },
    tab: {
      borderBottom: '1px solid gray'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardContainer: {
      marginTop: '2rem',
      width: '100%',
    }
  })
)
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function JobsView(props) {
  const classes = useStyles()

  return (<Card className={classes.cardContainer} variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" variant="h2" gutterBottom>
        {props.data.title}
      </Typography>

      <Typography className={classes.pos} color="textSecondary">
        {props.data.description}
      </Typography>
      <Typography variant="body2" component="p">
        Required Experience : {props.data.experience}
      </Typography>
    </CardContent>
    <CardActions >
      <Button size="small" variant="contained" color="primary" onClick={() => props.handleApply(props.data)}>Apply</Button>
    </CardActions>
  </Card>)
}
function AppliedView(props) {
  const classes = useStyles()
  return (<Card className={classes.cardContainer} variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" variant="h2" gutterBottom>
        {props.data.company}
      </Typography>

      <Typography className={classes.pos} color="textSecondary">
        {props.data.status}
      </Typography>
    </CardContent>

  </Card>)
}

const UserView: BlitzPage = () => {
  const classes = useStyles()
  const { toggle: togglePostNewJob, isShowing: isShowingNewJob } = useModal()
  const [createReviewMut] = useMutation(createReview)
  const [count] = useQuery(getJobsCount, {})
  const [value, setValue] = React.useState(0);
  const [{ jobs }] = useQuery(getJobs, {})
  const currentUser = useCurrentUser()
  const [{ reviews }] = useQuery(getReviews, { where: { userId: currentUser!.id } })
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const appliedJobIds = reviews.map(review => review.jobId)
  const unAppliedJobs = jobs.filter(job => !appliedJobIds.includes(job.id))
  const handleApply = async (job) => {
    try {
      await createReviewMut({
        jobId: job.id,
        userId: currentUser!.id || 0,
        status: 'Applied',
        company: job.company,
      })
      enqueueSnackbar("Successfully applied to Job", { variant: "success" })
      invalidateQuery(getJobs)
      invalidateQuery(getReviews)
    }
    catch {
      enqueueSnackbar("Something went wrong", { variant: "error" })
    }

  }
  return (
    <>
      <Head>
        <title>User View </title>
      </Head>

      <div className={classes.header}>
        <Suspense fallback={<div>Loading...</div>}>
          <Container maxWidth={false}>
            <Box p={3}>
              <Grid container>
                <Grid item xs={3}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                  >
                    <Tab label="Available Job Openings" className={classes.tab} />
                    <Tab label="Applied Jobs" className={classes.tab} />

                  </Tabs>
                </Grid>
                <Grid item xs={9}>
                  <TabPanel value={value} index={0}>
                    <Typography variant="h2">Available Jobs ({unAppliedJobs.length})</Typography>
                    {unAppliedJobs.map(item => <JobsView key={item.id} data={item} handleApply={handleApply} />)}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Typography variant="h2"> Applied Jobs ({reviews.length})</Typography>
                    {reviews.map(item => <AppliedView key={item.id} data={item} />)}
                  </TabPanel>
                </Grid >
              </Grid>
            </Box>
          </Container>
        </Suspense>
      </div>

      {isShowingNewJob && (
        <Modal open={isShowingNewJob} title={"Post New Job"} handleClose={togglePostNewJob}>
          <Suspense fallback={<Loader />}>
            <PostNewJobFormWrapper
              handleClose={() => {
                togglePostNewJob();
              }}
              schema={postNewJobSchema}
              initialValues={{
              }}
            />
          </Suspense>
        </Modal>
      )}
    </>
  )
}

UserView.authenticate = true
UserView.getLayout = (page) => <Layout>{page}</Layout>

export default UserView
