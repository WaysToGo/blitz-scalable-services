import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteReview = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteReview), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const review = await db.review.deleteMany({ where: { id } })

  return review
})
