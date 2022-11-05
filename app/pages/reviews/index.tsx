import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReviews from "app/reviews/queries/getReviews"

const ITEMS_PER_PAGE = 100

export const ReviewsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ reviews, hasMore }] = usePaginatedQuery(getReviews, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link href={Routes.ShowReviewPage({ reviewId: review.id })}>
              <a>{review.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ReviewsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Reviews</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewReviewPage()}>
            <a>Create Review</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ReviewsList />
        </Suspense>
      </div>
    </>
  )
}

ReviewsPage.authenticate = true
ReviewsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ReviewsPage
