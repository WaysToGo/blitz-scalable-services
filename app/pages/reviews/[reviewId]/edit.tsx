import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReview from "app/reviews/queries/getReview"
import updateReview from "app/reviews/mutations/updateReview"
import { ReviewForm, FORM_ERROR } from "app/reviews/components/ReviewForm"

export const EditReview = () => {
  const router = useRouter()
  const reviewId = useParam("reviewId", "number")
  const [review, { setQueryData }] = useQuery(
    getReview,
    { id: reviewId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateReviewMutation] = useMutation(updateReview)

  return (
    <>
      <Head>
        <title>Edit Review {review.id}</title>
      </Head>

      <div>
        <h1>Edit Review {review.id}</h1>
        <pre>{JSON.stringify(review, null, 2)}</pre>

        <ReviewForm
          submitText="Update Review"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateReview}
          initialValues={review}
          onSubmit={async (values) => {
            try {
              const updated = await updateReviewMutation({
                id: review.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowReviewPage({ reviewId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditReviewPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditReview />
      </Suspense>

      <p>
        <Link href={Routes.ReviewsPage()}>
          <a>Reviews</a>
        </Link>
      </p>
    </div>
  )
}

EditReviewPage.authenticate = true
EditReviewPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditReviewPage
