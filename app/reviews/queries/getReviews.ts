import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetReviewsInput
  extends Pick<Prisma.ReviewFindManyArgs, "where" | "orderBy" | "skip" | "take"> { }

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetReviewsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let {
      items: reviews,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.review.count({ where }),
      query: (paginateArgs) => db.review.findMany({ ...paginateArgs, where, orderBy }),
    })
    //add user info to reviews
    const users = await db.user.findMany()
    reviews = reviews.map((review) => {
      const user = users.find((user) => user.id === review.userId)
      return {
        ...review,
        user,
      }
    }
    )
    return {
      reviews,

      nextPage,
      hasMore,
      count,
    }
  }
)
