import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import { NoSsr } from "@material-ui/core"
import "@ag-grid-community/core/dist/styles/ag-grid.css"
import "@ag-grid-community/core/dist/styles/ag-theme-material.css"
import theme from "app/core/theme/theme"
import { SnackbarProvider } from "notistack"
import Head from "next/head"

//You can customize this as you want and even move it out to a separate file
const theme1 = createMuiTheme({
  palette: {
    type: "light",
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ThemeProvider theme={theme}>
      <NoSsr>
        <Head>
          {" "}
          <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" />
          <script async src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"></script>
        </Head>
        <CssBaseline />
        <Provider store={store}>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {getLayout(<Component {...pageProps} />)}
            </SnackbarProvider>
          </ErrorBoundary>
        </Provider>
      </NoSsr>
    </ThemeProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
