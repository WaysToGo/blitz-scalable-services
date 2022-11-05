import { Suspense } from "react"
import { BlitzPage } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { makeStyles } from "@material-ui/core"
import LoginLayout from "app/core/layouts/LoginLayout"
import LoginPage from "app/auth/pages/login"
import DashboardLayout from "app/core/layouts/Layout"
import Loader from "app/core/components/Loader"
import HR from "./HR"
import UserView from "./userView"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "100vh",
    backgroundColor: "red",
  },
}))

const UserInfo = () => {
  const currentUser = useCurrentUser()
  console.log(currentUser)
  if (currentUser) {
    return (
      <>
        <DashboardLayout>
          {currentUser.role === 'User' ? <UserView /> : <HR />}
        </DashboardLayout>
      </>
    )
  } else {
    return (
      <>
        <LoginPage />
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <Suspense fallback={<Loader />}>
          <UserInfo />
        </Suspense>
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
// Home.getLayout = (page) => <LoginLayout title="login">{page}</LoginLayout>

export default Home
