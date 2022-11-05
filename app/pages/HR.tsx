import { Suspense } from "react"
import { Head, BlitzPage, useQuery, useMutation, invalidateQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
import Profile from "app/profile/Profile"
import { Box, Button, Card, CardContent, Container, Grid, Paper, Typography } from "@material-ui/core"
import CardStats from "app/core/components/cards/CardStats"
import { AssignmentLateOutlined, AssignmentTurnedInOutlined, CheckCircleOutlineOutlined, StoreOutlined } from "@material-ui/icons"
import themeColors from "app/core/theme/colors"
import useModal from "app/core/hooks/useModal"
import Modal from "app/core/components/Modal/Modal"
import Loader from "app/core/components/Loader"
import { postNewJobSchema } from "app/jobs/schema/postNewJobSchema"
import PostNewJobFormWrapper from "app/jobs/schema/PostNewJobFormWrapper"
import getJobsCount from "app/jobs/queries/getJobsCount"
import getReviews from "app/reviews/queries/getReviews"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUser from "app/admin/users/queries/getUser"
import { useSnackbar } from "notistack"
import updateReview from "app/reviews/mutations/updateReview"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    header: {
      position: "relative",
      background: themeColors.dashboard.bgColor,
      color: themeColors.dashboard.header,
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
    cardContainer: {
      marginTop: '2rem',
      width: '100%',
      background: themeColors.dashboard.bgColor,
    }
  })
)

const HR: BlitzPage = () => {
  const classes = useStyles()
  const { toggle: togglePostNewJob, isShowing: isShowingNewJob } = useModal()
  const { toggle: toggleReviewJob, isShowing: isShowingReviewJob } = useModal()
  const { toggle: toggleHiredJob, isShowing: isShowingHireJob } = useModal()
  const { toggle: toggleRejectedJob, isShowing: isShowingRejectedList } = useModal()
  const currentUser = useCurrentUser()
  //get user with given id
  const [count] = useQuery(getJobsCount, {})
  const [updateReviewMut] = useMutation(updateReview)
  const [{ reviews }] = useQuery(getReviews, { where: { company: currentUser!.company || '' } })
  const { enqueueSnackbar } = useSnackbar();

  const appliedList = reviews.filter(item => item.status === 'Applied')
  const rejectedList = reviews.filter(item => item.status === 'Rejected')
  const hiredList = reviews.filter(item => item.status === 'Hired')
  console.log(reviews)
  return (
    <>
      <Head>
        <title>Hr View</title>
      </Head>

      <div className={classes.header}>
        <Suspense fallback={<div>Loading...</div>}>
          <Container maxWidth={false}>
            <Box p={3}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={2} >
                  <Button variant="contained" color="primary" onClick={toggleReviewJob} >Review </Button>
                </Grid>
                <Grid item xs={6} sm={2} >
                  <Button variant="contained" onClick={togglePostNewJob} color="primary"> New job</Button>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button variant="contained" color="primary" onClick={toggleHiredJob} > Hired </Button>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <Button variant="contained" color="primary" onClick={toggleRejectedJob} >Rejected</Button>
                </Grid>
              </Grid>
              <Box m={3}>
                <Typography variant="h2"> Dashboard</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <CardStats
                    subtitle="Applied"
                    title={appliedList.length}
                    icon={StoreOutlined}
                    footer={
                      <>
                        <Box component="span" whiteSpace="nowrap">
                          No of candidates applied
                        </Box>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                  <CardStats
                    subtitle="Reviewed"
                    title={rejectedList.length + hiredList.length}
                    icon={AssignmentTurnedInOutlined}
                    footer={
                      <>
                        <Box component="span" whiteSpace="nowrap">
                          No of candidates Reviewed
                        </Box>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CardStats
                    subtitle="Rejected"
                    title={rejectedList.length}
                    icon={AssignmentLateOutlined}
                    footer={
                      <>
                        <Box component="span" whiteSpace="nowrap">
                          No of candidates Reviewed
                        </Box>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CardStats
                    subtitle="Open Jobs"
                    title={count}
                    icon={CheckCircleOutlineOutlined}
                    footer={
                      <>
                        <Box component="span" whiteSpace="nowrap">
                          Total number of open jobs
                        </Box>
                      </>
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Suspense>
      </div>

      {isShowingNewJob && (
        <Modal open={isShowingNewJob} title={"Post New Job"} handleClose={toggleReviewJob}>
          <Suspense fallback={<Loader />}>
            <PostNewJobFormWrapper
              handleClose={() => {
                togglePostNewJob();
                invalidateQuery(getJobsCount)
              }}
              schema={postNewJobSchema}
              initialValues={{
              }}
            />
          </Suspense>
        </Modal>
      )}
      {isShowingReviewJob && (
        <Modal open={isShowingReviewJob} title={"Review candidates List"} handleClose={toggleReviewJob}>
          <Suspense fallback={<Loader />}>
            {appliedList.map((item: any) => (<Card key={item.id} className={classes.cardContainer} variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid item xs={10} >
                    <Typography color="textSecondary" variant="h2" gutterBottom>
                      {item?.user?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color="textSecondary" variant="h4">
                      {item.status}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} >
                    <Typography color="textSecondary" >
                      {item?.user?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} >
                    <Typography color="textSecondary" >
                      {item?.user?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} >
                    <Box display="flex" >
                      <Box ml={3}>
                        <Button variant="contained" color="primary" onClick={async () => {
                          try {
                            await updateReviewMut({
                              id: item.id,
                              status: 'Hired'
                            })
                            invalidateQuery(getReviews)
                            toggleReviewJob();
                            enqueueSnackbar('successfully updated status', { variant: 'success' })
                          }
                          catch {
                            enqueueSnackbar('failed to update status', { variant: 'error' })
                          }

                        }}>Select</Button>
                      </Box>
                      <Box ml={3}>
                        <Button variant="outlined" color="primary" onClick={async () => {

                          try {
                            await updateReviewMut({
                              id: item.id,
                              status: 'Rejected'
                            })
                            invalidateQuery(getReviews)
                            toggleReviewJob()
                            enqueueSnackbar('successfully updated status', { variant: 'success' })
                          }
                          catch {
                            enqueueSnackbar('failed to update status', {
                              variant: 'error',
                            });
                          }
                        }}>Reject</Button>
                      </Box>
                    </Box>
                  </Grid>

                </Grid>
              </CardContent>

            </Card>))}
            {appliedList.length == 0 && <Typography color="textSecondary" variant="h2" align="center" >List is empty</Typography>}
            <Box mt={3} display="flex" justifyContent={"flex-end"}>
              <Button variant="outlined" color="primary" onClick={toggleReviewJob}>close</Button>
            </Box>
          </Suspense>
        </Modal>
      )
      }
      {isShowingHireJob && (
        <Modal open={isShowingHireJob} title={"Review candidates List"} handleClose={toggleHiredJob}>
          <Suspense fallback={<Loader />}>
            {hiredList.map((item: any) => (<Card key={item.id} className={classes.cardContainer} variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid item xs={10} >
                    <Typography color="textSecondary" variant="h2" gutterBottom>
                      {item?.user?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color="textSecondary" variant="h4">
                      {item.status}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} >
                    <Typography color="textSecondary" >
                      {item?.user?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} >
                    <Typography color="textSecondary" >
                      {item?.user?.email}
                    </Typography>
                  </Grid>

                </Grid>
              </CardContent>

            </Card>))}
            {hiredList.length == 0 && <Typography color="textSecondary" variant="h2" align="center" >List is empty</Typography>}
            <Box mt={3} display="flex" justifyContent={"flex-end"}>
              <Button variant="outlined" color="primary" onClick={toggleHiredJob}>close</Button>
            </Box>
          </Suspense>
        </Modal>
      )
      }
      {isShowingRejectedList && (
        <Modal open={isShowingRejectedList} title={"Review candidates List"} handleClose={toggleRejectedJob}>
          <Suspense fallback={<Loader />}>
            {rejectedList.map((item: any) => (<Card key={item.id} className={classes.cardContainer} variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid item xs={10} >
                    <Typography color="textSecondary" variant="h2" gutterBottom>
                      {item?.user?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color="textSecondary" variant="h4">
                      {item.status}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} >
                    <Typography color="textSecondary" >
                      {item?.user?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} >
                    <Typography color="textSecondary" >
                      {item?.user?.email}
                    </Typography>
                  </Grid>


                </Grid>
              </CardContent>

            </Card>))}
            {rejectedList.length == 0 && <Typography color="textSecondary" variant="h2" align="center" >List is empty</Typography>}
            <Box mt={3} display="flex" justifyContent={"flex-end"}>
              <Button variant="outlined" color="primary" onClick={toggleRejectedJob}>close</Button>
            </Box>
          </Suspense>
        </Modal>
      )
      }
    </>
  )
}

HR.authenticate = true
HR.getLayout = (page) => <Layout>{page}</Layout>

export default HR
