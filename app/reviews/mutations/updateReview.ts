import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateReview = z.object({
  id: z.number(),
  status: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateReview),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const review = await db.review.update({ where: { id }, data })

    return review
  }
)
