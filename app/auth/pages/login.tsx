import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import { Routes } from "blitz"
import LoginLayout from "app/core/layouts/LoginLayout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={() => {
          Routes.Home()
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <LoginLayout title="login">{page}</LoginLayout>

export default LoginPage
