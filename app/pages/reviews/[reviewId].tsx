import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReview from "app/reviews/queries/getReview"
import deleteReview from "app/reviews/mutations/deleteReview"

export const Review = () => {
  const router = useRouter()
  const reviewId = useParam("reviewId", "number")
  const [deleteReviewMutation] = useMutation(deleteReview)
  const [review] = useQuery(getReview, { id: reviewId })

  return (
    <>
      <Head>
        <title>Review {review.id}</title>
      </Head>

      <div>
        <h1>Review {review.id}</h1>
        <pre>{JSON.stringify(review, null, 2)}</pre>

        <Link href={Routes.EditReviewPage({ reviewId: review.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteReviewMutation({ id: review.id })
              router.push(Routes.ReviewsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowReviewPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ReviewsPage()}>
          <a>Reviews</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Review />
      </Suspense>
    </div>
  )
}

ShowReviewPage.authenticate = true
ShowReviewPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowReviewPage
