import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createReview from "app/reviews/mutations/createReview"
import { ReviewForm, FORM_ERROR } from "app/reviews/components/ReviewForm"

const NewReviewPage: BlitzPage = () => {
  const router = useRouter()
  const [createReviewMutation] = useMutation(createReview)

  return (
    <div>
      <h1>Create New Review</h1>

      <ReviewForm
        submitText="Create Review"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateReview}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const review = await createReviewMutation(values)
            router.push(Routes.ShowReviewPage({ reviewId: review.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ReviewsPage()}>
          <a>Reviews</a>
        </Link>
      </p>
    </div>
  )
}

NewReviewPage.authenticate = true
NewReviewPage.getLayout = (page) => <Layout title={"Create New Review"}>{page}</Layout>

export default NewReviewPage
