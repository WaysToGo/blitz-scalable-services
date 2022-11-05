import { Head, ErrorComponent } from "blitz"

export default function Page401() {
  const statusCode = 401
  const title = "You don't have access to this page. Please contact support team for help."
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent statusCode={statusCode} title={title} />
    </>
  )
}
