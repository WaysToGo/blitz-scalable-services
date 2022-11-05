import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateReview = z.object({
  jobId: z.number(),
  userId: z.number(),
  status: z.string(),
  company: z.string(),
})

export default resolver.pipe(resolver.zod(CreateReview), resolver.authorize(), async (input) => {

  const review = await db.review.create({ data: input })
  return review
})
