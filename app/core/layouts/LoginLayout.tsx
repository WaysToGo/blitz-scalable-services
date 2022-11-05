import { Suspense } from "react"
import { Head } from "blitz"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import DashboardLayout from "app/core/layouts/Layout"
import Loader from "../components/Loader"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  children: {},
}))

const LoginLayout = ({ title, children }) => {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{`ATS | ${title}`}</title>
      </Head>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  )
}

LoginLayout.redirectAuthenticatedTo = "/"
LoginLayout.getLayout = (page) => <DashboardLayout title="Login">{page}</DashboardLayout>
export default LoginLayout
